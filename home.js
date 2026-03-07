
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
        ? "assest/B13-A5-Github-Issue-Tracker/assets/Aperture.png" 
        : "assest/B13-A5-Github-Issue-Tracker/assets/Unknown-Status.png"; 
      
         let div = document.createElement("div");
        div.innerHTML = `
             <div class="w-[260px] h-[330px] border-1 rounded-md shadow-sm p-[10px] bg-white">
                 <div class="flex justify-between">
                    <img class="mx-4 my-2" src="${statusClass}">
                    <button class="btn btn-xs mx-2 my-2">${elemen.priority}</button>
                </div>
               <div class="text-xs text-gray-400">#${elemen.id}</div>
                <div class="font-bold text-lg line-clamp-1">${elemen.title}</div>
                <div class="text-gray-500 text-sm line-clamp-2">${elemen.description}</div>
                 <div class="flex flex-wrap gap-2 mt-2">
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





