
   let allData = []; 
 const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";


 fetch(url)
     .then(res => res.json())
     .then(data => {
         allData = data.data; 
         updateCounts();      
        FetchFunction1(allData); 
     });


 function updateCounts() {
     const allCount = allData.length;
     const openCount = allData.filter(item => item.status === "open").length;
     const closedCount = allData.filter(item => item.status === "closed").length;

    
     if(document.getElementById("allCount")) document.getElementById("allCount").innerText = allCount;
     if(document.getElementById("openCount")) document.getElementById("openCount").innerText = openCount;
     if(document.getElementById("closedCount")) document.getElementById("closedCount").innerText = closedCount;
    
    
     document.getElementById("headcounter").innerText = `${allCount} Issues`;
 }


 document.getElementById("buttonAll").addEventListener("click", () => {
     FetchFunction1(allData);
     document.getElementById("headcounter").innerText = `${allData.length} Issues`;
 });


 document.getElementById("buttonOpen").addEventListener("click", () => {
    const openIssues = allData.filter(item => item.status === "open");
     FetchFunction1(openIssues);
     document.getElementById("headcounter").innerText = `${openIssues.length} Open Issues`;
 });


 document.getElementById("buttonClosed").addEventListener("click", () => {
     const closedIssues = allData.filter(item => item.status === "closed");
     FetchFunction1(closedIssues);
     document.getElementById("headcounter").innerText = `${closedIssues.length} Closed Issues`;
 });


 let FetchFunction1 = (potes) => {
     let ALLissue = document.getElementById("ALLissue");
     ALLissue.innerHTML = ""; 

     potes.forEach(elemen => {
    
    const statusValue = elemen.status ? elemen.status.toLowerCase() : "";

          const statusClass = statusValue === "open" 
    ? "assest/B13-A5-Github-Issue-Tracker/assets/Open-Status.png" 
    : statusValue === "closed" 
        ? "assest/B13-A5-Github-Issue-Tracker/assets/closed-status.png" : "assest/B13-A5-Github-Issue-Tracker/assets/Unknown-Status.png"; 
        const borderColor = statusValue === "open" ? "border-t-green-400" : statusValue === "closed" ? "border-t-purple-500" : "border-t-gray-300";
      
         let div = document.createElement("div");
        div.innerHTML = `
                  



             <div onclick="sengleIssure(${elemen.id})" class=" w-[260px] h-[330px] ${borderColor} border-2 rounded-md border-white-500 shadow-sm p-[10px] bg-white">
                 <div class="flex justify-between">
                    <img class="mx-4 my-2" src="${statusClass}">
                    <button class="btn btn-xs mx-2 my-2 text-red-300">${elemen.priority}</button>
                </div>
               <div class="text-xs text-gray-400">#${elemen.id}</div>
                <div class="font-bold text-lg line-clamp-1">${elemen.title}</div>
                <div class="text-gray-500 text-sm line-clamp-2">${elemen.description}</div>
                 <div class="flex flex-wrap gap-2 mt-2 bg-yellow-100">
                     ${elemen.labels.map(label => `<span class="badge badge-outline">${label}</span>`).join('')}
                 </div>
                <div class="border-t border-gray-200 mt-4 pt-2">
                     <div class="text-sm text-gray-500 font-semibold">by ${elemen.author}</div>
                     <div class="text-xs text-gray-400">${new Date(elemen.updatedAt).toLocaleDateString()}</div>
                 </div>
             </div>

         `;
         ALLissue.appendChild(div);
     });
 };


const sengleIssure = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            
            const issueDetail = data.data || data;
            
            displayModal(issueDetail);
        })
        .catch(err => console.error("Error fetching data:", err));
};


const displayModal = (data) => {
    
    document.getElementById('modal-title').innerText = data.title || "No Title";
    document.getElementById('modal-id').innerText = data.id || "N/A";
    document.getElementById('modal-description').innerText = data.description || "No description";
    document.getElementById('modal-status').innerText = data.status || "Unknown";
    document.getElementById('modal-priority').innerText = data.priority || "Normal";
    document.getElementById('modal-author').innerText = data.author || "Anonymous";

    if (data.updatedAt) {
        document.getElementById('modal-date').innerText = new Date(data.updatedAt).toLocaleDateString();
    }

    
    const modal = document.getElementById('my_modal_1');
    if (modal) {
        modal.showModal();
    }
};




const searchInput = document.getElementById("searchbutton"); 

if (searchInput) {
    
    searchInput.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();

        
        const filteredIssues = allData.filter(issue => {
            return (
                issue.title.toLowerCase().includes(query) || 
                issue.description.toLowerCase().includes(query)
            );
        });

        
        FetchFunction1(filteredIssues);
        
        
        document.getElementById("headcounter").innerText = `${filteredIssues.length} Issues Found`;
    });
}