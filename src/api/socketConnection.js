export const requestData = (socket) => {
    console.log("dasdasd")
    socket.emit("req_acc_data", 'req');
}

export const stopData = (socket) => {
    socket.emit("stop_acc_data", 'stop');
}

