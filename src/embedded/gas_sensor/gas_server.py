import websockets
import asyncio
import serial.tools.list_ports
import time

# List all available COM ports on the computer.
def find_coms():
    ports_found = serial.tools.list_ports.comports()
    print("[COM ports found]")
    for item in ports_found:
        print(str(item))

    return ports_found

# Finds the COM port in witch the gas sensor is connected, looking for the keywords "ch340" or "arduino", usually present in the ports connected to the microcontroller of the gas sensor.
def encontra_sensor(com_portas):
    porta_modulo_feedback = "None"
    for item in com_portas:
        str_item = str(item)

        if "ch340" in str_item.lower() or "arduino" in str_item.lower():
            print("[Porta do sensor de gás encontrada]")
            print(str_item)
            spt_str_item = str_item.split(" ")
            porta_modulo_feedback = spt_str_item[0]

    if porta_modulo_feedback == "None":
        print("[Porta do sensor de gás não encontrada]")

    return porta_modulo_feedback

# Opens the serial communication port with communication port parameters
def conect_gas_sensor(com_gas_sensor, taxa_transmissao, tempo_espera):

    print("Connecting device...", "\n")

    comunicacao_serial = False
    try:
        comunicacao_serial = serial.Serial(com_gas_sensor, 
                                            taxa_transmissao,
                                            timeout = tempo_espera)
        time.sleep(2)

        print("[Módulo de Feedback conectado com sucesso :) ]")
        return comunicacao_serial

    except:
        print("[A conexão com o módulo de feeback falhou :( ]")
        return comunicacao_serial

# Sends a message to the serial port
def envia_informacao(objeto_comunicacao, mensagem):

    try:
        objeto_comunicacao.write(str.encode(mensagem))

        return True

    except:
        print("[Mensagem não enviada.]")       

        return False

# Connects to the gas sensor and returns the serial communication object
def connect_device(taxa_transferencia, tempo_maximo_espera):

    comunicacao = False

    print()
    portas_com = find_coms()
    print()
    porta_modulo = encontra_sensor(portas_com)
    print()
    comunicacao = conect_gas_sensor(porta_modulo, taxa_transferencia, tempo_maximo_espera)
    print()
    time.sleep(1)

    return comunicacao

COM_BOUNDRATE = 115200
COM_TIMEOUT = 1
AMOSTRAR_SENSOR = "1"

porta_serial = connect_device(COM_BOUNDRATE, COM_TIMEOUT)

HOST = 'ws://10.128.66.155:3001/analyze/gas-sensor'

async def main():
    async with websockets.connect(HOST) as websocket:

        try:
            while True:
                try:
                  
                    envia_informacao(porta_serial, AMOSTRAR_SENSOR)
                    gas_sensor_value = porta_serial.readline().decode("utf-8").strip()
                    print("Received via serial:", gas_sensor_value)
                
                    gas_sensor_value_bytes = str(gas_sensor_value).encode()

                    await websocket.send(gas_sensor_value_bytes)
                    response = await websocket.recv()
                    print(f"Recebido: {response}")
                    await asyncio.sleep(0.5)
                    print("Enviado via socket:", gas_sensor_value_bytes, "\n")

                except Exception as err:
                    print("Error:", err)
                    print("Client disconnected")
                    break

        except KeyboardInterrupt:
            print("Server is shutting down...")
            
if __name__ == '__main__':
    asyncio.run(main())