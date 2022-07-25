// api url
const api_url =  window.location.href;
console.log(api_url)


const strs = api_url.split('/');
const id = strs.at(-1)
const comment_uri = `http://localhost:3000/comments/${id}`


async function getapi() {
	
	// Storing response
    const response = await fetch(comment_uri);
    const names = await response.json();
    // console.log(names); 

	if (response) {
		hideloader();
	}
	show(names.ListofComments);
}
// Calling that async function
getapi();

// Function to hide the loader
function hideloader() {
	document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
	let tab =``;
	
	// Loop to access all rows
	for (const key in data) {
       //  console.log(data[key])
         console.log(data[key].name)
         if(!(data[key].name))
         {
             
             let anon = 'Anonymous';
             tab += `
             <div class="row mt-5 mb-5">
                 <div class="media">
                  <div class="media-body">
                    <h5 class="mt-0"><b>${anon} </b></h5>
                     ${data[key].commentOne}<hr style="width:700px; border-top: 1px solid rgb(0 0 0 / 25%) !important"> 
                  </div>
              </div>
          </div>`;
           if(data[key].commentTwo)
           {
            let anons = 'Anonymous';
               tab += `
             <div class="row mt-5 mb-5">
                 <div class="media">
                  <div class="media-body">
                    <h5 class="mt-0"><b>${anons} </b></h5>
                     ${data[key].commentTwo} 
                     <hr style="width:700px; border-top: 1px solid rgb(0 0 0 / 25%) !important">
                  </div>
              </div>
          </div>`;
           }    
       }
     else{
        let acc = data[key].name
        tab += `
             <div class="row mt-5 mb-5">
                <div class="media">
                 <div class="media-body">
                   <h5 class="mt-0">${acc}</h5>
                    ${data[key].commentOne} <hr style="width:700px; border-top: 1px solid rgb(0 0 0 / 25%) !important">
                 </div>
               </div>
             </div>`;
         if(data[key].commentTwo)
           {
               tab += `
             <div class="row mt-5 mb-5">
                 <div class="media">
                  <div class="media-body">
                    <h5 class="mt-0">${acc}</h5>
                     ${data[key].commentTwo} <hr style="width:700px; border-top: 1px solid rgb(0 0 0 / 25%) !important"> 
                  </div>
               </div>
            </div>`;
           }
         }}

    // Setting innerHTML as tab variable
	 document.getElementById("commenets").innerHTML = tab;
}
