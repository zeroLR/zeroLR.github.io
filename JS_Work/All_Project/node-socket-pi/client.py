import socket
import argparse
import urllib.request
import json
parser = argparse.ArgumentParser(
    description="This is the client for the multi threaded socket server!")
parser.add_argument('--host', metavar='host', type=str,
                    nargs='?', default=socket.gethostname())
parser.add_argument('--port', metavar='port',
                    type=int, nargs='?', default=9999)
args = parser.parse_args()

print(f"Connecting to server: {args.host} on port: {args.port}")
# url = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0003-001?Authorization=CWB-07DE0300-AA6A-4CDB-9A09-A11A32C8B0B1&downloadType=WEB&format=JSON'
url = "http://0.0.0.0:5050/data"
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sck:
    try:
        sck.connect((args.host, args.port))
        print(
            f"Connected! client is {sck.getsockname()[0]}:{sck.getsockname()[1]}")
    except Exception as e:
        raise SystemExit(
            f"We have failed to connect to host: {args.host} on port: {args.port}, because: {e}")

    while True:
        try:
            msg = input("What do we want to send to the server?: ")
            sck.sendall(msg.encode('utf-8'))

            data = sck.recv(1024)
            print(f"The server's response was: {data.decode()}")
            if msg == 'getdata':
                content = urllib.request.urlopen(url)
                content = json.load(content)
                content = json.dumps(content)
                data = content
                sck.sendall(data.encode('utf-8'))
                data = sck.recv(1024)
                print(f"The server's response was: {data.decode()}")
            if msg == 'ip':
                ip = f"Client ip is : {sck.getsockname()[0]}:{sck.getsockname()[1]}"
                sck.sendall(ip.encode('utf-8'))
                data = sck.recv(1024)
                print(f"The server's response was: {data.decode()}")
            if msg == 'exit':
                ip = f"Client from {sck.getsockname()[0]}:{sck.getsockname()[1]} exit!"
                sck.sendall(ip.encode('utf-8'))
                print("Client is saying goodbye!")
                data = sck.recv(1024)
                print(f"The server's response was: {data.decode()}")
                break

        except KeyboardInterrupt:
            e = f"Client from {sck.getsockname()[0]}:{sck.getsockname()[1]} exit!"
            sck.sendall(e.encode('utf-8'))
            print("Client is saying goodbye!")
            break
