document.addEventListener("DOMContentLoaded", () => {
    const serverTable = document.getElementById("serverTable").getElementsByTagName("tbody")[0];
    const loadingRow = serverTable.insertRow();
    const loadingCell = loadingRow.insertCell(0);
    loadingCell.colSpan = 5;
    loadingCell.textContent = "Solicitando datos a la API...";

    fetch("https://api.bringfeel.com.ar/xanarky") 
    .then(response => response.json())
        .then(data => {
            serverTable.removeChild(loadingRow); // Eliminar la fila de carga

            let totalOnlinePlayers = 0; // Variable para almacenar el total de jugadores en línea
            
            data.forEach(server => {
                const lastupdate = document.getElementById('lastupdate');
                lastupdate.textContent = server.lastUpdateTime;

                const row = serverTable.insertRow();
                
                row.insertCell(0).textContent = server.name;
                var statusinfo = row.insertCell(1);
                statusinfo.textContent = server.online ? "🟢" : "🔴"
                var statusTitle = server.online ? "Server Online" : "Server Offline";
                statusinfo.setAttribute("title", statusTitle);
                
                totalOnlinePlayers += server.playersOnline; // Sumar jugadores en línea de este servidor al total
            });

            // Agregar una fila para mostrar el total de jugadores en línea
            const totalRow = serverTable.insertRow();
        })
        .catch(error => console.error("Error fetching data:", error));
});