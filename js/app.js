const fetchAllTools = (dataLimit) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(url)
        .then(res => res.json())
        .then(data => showTools(data?.data?.tools, dataLimit));
}


//loop and display:
const showTools = (receivedData, dataLimit) => {
    const cardContainer = document.getElementById('card-container');
    const seeMoreBtn = document.getElementById('btn-see-more');

    // show six card at first:
    if (dataLimit && receivedData.length > 6) {
        receivedData = receivedData.slice(0, 6);
        seeMoreBtn.classList.remove('hidden');
    } else {
        seeMoreBtn.classList.add('hidden');
        cardContainer.innerHTML = ''; // remove all data from display
    }
    // display cards:
    receivedData.forEach(singleTool => {
        cardContainer.innerHTML += `
    <div class="card w-full border">
        <figure class="px-10 pt-10">
        <img src="${singleTool.image}" alt=""
            class="rounded-xl" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Features</h2>
            <ol class="list-decimal list-inside">
                <li>${singleTool.features[0]}</li>
                <li>${singleTool.features[1]}</li>
                <li>${singleTool.features[2]}</li>
            </ol>
        <hr class="my-4">
        <div class="flex justify-between items-center">
            <div>
                <h2 class="card-title mb-3">${singleTool.name}</h2>
                <p>${singleTool.published_in}</p>
            </div>
            <button class="" onclick="fetchToolsDetails('${singleTool.id}')">
                <label for="modal">
                    <i class="fa-solid fa-arrow-right text-red-400 bg-red-50 hover:bg-red-100  px-4 py-4 text-center items-center rounded-[50%]"></i>
                </label>
            </button>
            
        </div>
    </div>`

    });
}


// six data only:
fetchAllTools(6);


//see more button show all cards:
document.getElementById('btn-see-more').addEventListener('click', function () {
    fetchAllTools();
});

// for modal:
// load dynamic API:
const fetchToolsDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showToolsDetails(data))
}

// show modal:

const showToolsDetails = dataDetails => {
    console.log(dataDetails.data);
    const { features, integrations, image_link, tool_name } = dataDetails.data;
    document.getElementById('modal-body').innerHTML =
        `
        <div class="modal-box relative">
            <label for="modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <div class="flex justify-between gap-6 p-6">
                <div id="left-section" class="bg-green-100 w-full">
                    <h2>${tool_name}</h2>
                    <div class="flex justify-between">
                        <h2>1</h2>
                        <h2>2</h2>
                        <h2>3</h2>
                    </div>
                    <div class="flex justify-between">
                        <div>
                            <h2></h2>
                            <ul class="list-decimal list-inside">
                                <li>${features[1].feature_name}</li>
                                <li>${features[2].feature_name}</li>
                                <li>${features[3].feature_name}</li>
                            </ul>
                        </div>
                        <div>
                            <h2></h2>
                            <ul class="list-decimal list-inside">
                                <li>${integrations[0]}</li>
                                <li>${integrations[1]}</li>
                                <li>${integrations[2]}</li>   
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="right-section" class="bg-red-100 w-full">
                    <img src="${image_link[0]}" alt="">
                    <h2>text</h2>
                    <p>paragraph</p>
                </div>
            </div>
        </div>
    `;
}
















// const showNewsDetails = newsDetails => {
//     const { title, image_url, details, others_info } = newsDetails;
//     document.getElementById('exampleModalLabel').innerText = title;
//     document.getElementById('modal-body').innerHTML = `
//     <span class="badge text-bg-danger">${others_info.is_trending ? "Trending" : ""}</span>
//     <img src="${image_url}" class="img-fluid mt-1" alt="...">
//         <div>
//             <p class="card-text mt-2">${details}</p>
//         </div>
//     `;
// }









