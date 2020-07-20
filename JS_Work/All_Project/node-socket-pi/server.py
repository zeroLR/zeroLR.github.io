import socket
import argparse
import threading
import urllib.request

parser = argparse.ArgumentParser(
    description="This is the server for the multithreaded socket demo!")
parser.add_argument('--host', metavar='host', type=str,
                    nargs='?', default=socket.gethostname())
parser.add_argument('--port', metavar='port',
                    type=int, nargs='?', default=9999)
args = parser.parse_args()

print(f"Running the server on: {args.host} and port: {args.port}")

sck = socket.socket()
sck.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

try:
    sck.bind((args.host, args.port))
    sck.listen(5)
except Exception as e:
    raise SystemExit(
        f"We could not bind the server on host: {args.host} to port: {args.port}, because: {e}")


def hello():
    print("hello, world")


def getData(client):
    contents = urllib.request.urlopen("http://127.0.0.1").read()
    reply = f"get url \n {contents}"
    client.sendall(reply.encode('utf-8'))
    print("get data")


class RepeatingTimer(threading.Timer):
    def run(self):
        while not self.finished.is_set():
            self.function(*self.args, **self.kwargs)
            self.finished.wait(self.interval)


def on_new_client(client, connection):
    ip = connection[0]
    port = connection[1]
    print(f"THe new connection was made from IP: {ip}, and port: {port}!")

    while True:
        msg = client.recv(1024)

        if msg.decode() == 'ip':
            print(f"The client ip is: {ip}:{port}")
            reply = f"Your ip is: {ip}:{port}"
            client.sendall(reply.encode('utf-8'))
        if msg.decode() == 'get':
            contents = urllib.request.urlopen("http://127.0.0.1").read()
            reply = f"get url \n {contents}"
            client.sendall(reply.encode('utf-8'))
        if msg.decode() == 'getdata':
            t = RepeatingTimer(3.0, hello)
            t.start()
        if msg.decode() == 'exit':
            if(t.isAlive):
                t.cancel()

            break

        print(f"The client said: {msg.decode()}")
        # reply = f"You told me: {msg.decode()}"
        # client.sendall(reply.encode('utf-8'))
    print(
        f"The client from ip: {ip}, and port: {port}, has gracefully diconnected!")
    client.close()


while True:
    try:
        client, ip = sck.accept()
        threading._start_new_thread(on_new_client, (client, ip))
    except KeyboardInterrupt:
        print(f"Gracefully shutting down the server!")
        break
    except Exception as e:
        print(f"Well I did not anticipate this: {e}")

sck.close()
