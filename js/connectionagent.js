export default class ConnectionAgent {
  constructor(){
    this.conn = null;
  }

  connect(addr){
    this.conn = new WebSocket(addr);

    this.conn.addEventListener("open", () => {
      console.log("Connection established");
      this.initSession();
    })

    this.conn.addEventListener("message", event => {
      this.recieve(event.data);
    })

  }

  send(data){
    let msg = JSON.stringify(data);
    this.conn.send(msg);
    console.log(`Message sent: ${msg}`);
  }


  recieve(msg){
    let data = JSON.parse(msg);
    console.log(`Message recieved: ${data}`);
  }

  initSession(){}

  disconnect(){
    this.conn = null;
  }
}
