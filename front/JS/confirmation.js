let orderId = new URL(window.location.href).searchParams.get('orderId');

function getOrderId() {
    const displayOrderId = document.getElementById("orderId");
    displayOrderId.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}

getOrderId()