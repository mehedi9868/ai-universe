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
            <button class="bg-red-50 hover:bg-red-100  px-4 py-3 text-center items-center rounded-[50%]"><i
                    class="fa-solid fa-arrow-right text-red-400"></i></button>
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











