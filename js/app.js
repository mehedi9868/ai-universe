//spinner start:
const spinnerBtn = document.getElementById('btn-spinner');
spinnerBtn.classList.remove('hidden');
//load data:
let dataArr = [];
let dataLimit = 6;
const fetchAllTools = () => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            dataArr = data.data.tools;
            showTools()

        });
}

//loop and display:
const showTools = () => {
    const cardContainer = document.getElementById('card-container');
    const seeMoreBtn = document.getElementById('btn-see-more');
    cardContainer.innerHTML = '';

    // show six card at first:

    let slicedData = dataArr.slice(0, dataLimit);
    // display cards:
    slicedData.forEach(singleTool => {
        cardContainer.innerHTML += `
    <div class="card w-full border">
        <figure class="px-10 pt-10">
        <img src="${singleTool.image}" alt=""
            class="rounded-xl" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Features</h2>
            <ol class="list-decimal list-inside">
                <li>${singleTool && singleTool?.features[0] ? singleTool.features[0] : 'No Data Found'}</li>
                <li>${singleTool && singleTool?.features[1] ? singleTool.features[1] : 'No Data Found'}</li>
                <li>${singleTool && singleTool?.features[2] ? singleTool.features[2] : 'No Data Found'}</li>
            </ol>
        <hr class="my-4">
        <div class="flex justify-between items-center">
            <div>
                <h2 class="card-title mb-3">${singleTool && singleTool.name ? singleTool.name : 'No Data Found'}</h2>
                <p><i class="fa-regular fa-calendar-days"></i> ${singleTool && singleTool.published_in ? singleTool.published_in : 'No Data Found'}</p>
            </div>
            <button class="" onclick="fetchToolsDetails('${singleTool.id}')">
                <label for="modal">
                    <i class="fa-solid fa-arrow-right text-red-400 bg-red-50 hover:bg-red-100  px-4 py-4 text-center items-center rounded-[50%]"></i>
                </label>
            </button>
            
        </div>
    </div>`;

        //spinner end:
        spinnerBtn.classList.add('hidden');

    });
    // show/hide see-more-btn
    if (dataLimit >= dataArr.length) {
        seeMoreBtn.classList.add('hidden');
    } else {
        seeMoreBtn.classList.remove('hidden');
    }
}

// sort all data by Date:
const sortBtn = document.getElementById('btn-sort')
sortBtn.addEventListener('click', function () {
    dataArr.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
    dataLimit = 6;
    showTools();
});

// see more button show all cards:
const btnSeeMore = document.getElementById('btn-see-more')
btnSeeMore.addEventListener('click', function () {
    dataLimit = dataArr.length;
    showTools();
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
    const { description, pricing,
        features, integrations, image_link, tool_name, input_output_examples, accuracy } = dataDetails.data;
    document.getElementById('modal-body').innerHTML =
        `
        <div class="modal-box w-11/12 max-w-6xl relative">
            <label for="modal" class="btn btn-sm btn-circle bg-red-600 border-none absolute right-2 top-2 hover:bg-red-400">✕</label>
            <div class="flex flex-col lg:flex-row justify-between gap-6 p-1 lg:p-10">
                <div id="left-section" class="bg-red-50 w-full border-2 border-red-400 rounded-lg p-6">
                    <h2 class="font-bold mb-5">${description}</h2>
                    <div class="flex flex-col sm:flex-row sm:justify-between gap-3">
                        <h2 class="bg-slate-50 p-4 sm:p-7 rounded-xl text-green-600 font-bold text-center sm:text-left">${pricing && pricing[0]?.price ? pricing[0].price : 'Free of Cost'} <br/> ${pricing && pricing[0]?.plan ? pricing[0].plan : 'Basic'}
                        </h2>
                        <h2 class="bg-slate-50 p-4 sm:p-7 rounded-xl text-orange-400 font-bold text-center sm:text-left">${pricing && pricing[1]?.price ? pricing[1].price : 'Free of Cost'} <br/> ${pricing && pricing[1]?.plan ? pricing[1].plan : 'Pro'}</h2>
                        <h2 class="bg-slate-50 p-4 sm:p-7 rounded-xl text-red-600 font-bold text-center sm:text-left">${pricing && pricing[2]?.price ? pricing[2].price : 'Free of Cost'} <br/> ${pricing && pricing[2]?.plan ? pricing[2].plan : 'Enterprise'}</h2>
                    </div>
                    <div class="flex justify-between">
                        <div>
                            <h2 class="font-bold my-5">Features</h2>
                            <ul class="list-disc list-inside">
                                <li>${features && features[1]?.feature_name ? features[1].feature_name : 'No Data Found'}</li>
                                <li>${features && features[2]?.feature_name ? features[2].feature_name : 'No Data Found'}</li>
                                <li>${features && features[3]?.feature_name ? features[3].feature_name : 'No Data Found'}</li>
                                <li>${features && features[4]?.feature_name ? features[4].feature_name : 'No Data Found'}</li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="font-bold my-5">Integrations</h2>
                            <ul class="list-disc list-inside">
                                <li>${integrations && integrations[0] ? integrations[0] : 'No Data Found'}</li>
                                <li>${integrations && integrations[1] ? integrations[1] : 'No Data Found'}</li>
                                <li>${integrations && integrations[2] ? integrations[2] : 'No Data Found'}</li>   
                                <li>${integrations && integrations[3] ? integrations[3] : 'No Data Found'}</li>   
                                <li>${integrations && integrations[4] ? integrations[4] : 'No Data Found'}</li>   
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="right-section" class="bg-white w-full h-full border-2 rounded-lg p-6">
                    <div class="relative">
                        <img src="${image_link[0]}" alt="" class="rounded-xl w-full">
                        <p class="absolute top-2 right-2 bg-red-600 font-bold text-white px-8 py-2 rounded-lg ${accuracy && accuracy.score ? '' : 'hidden'}">
                        ${accuracy && accuracy.score ? accuracy.score * 100 + '% accuracy' : 'No Data Found'}</p>
                    </div>
                    <h2 class="text-center font-bold mt-5 mb-3">${input_output_examples && input_output_examples[0]?.input ? input_output_examples[0].input : 'Can you give any example?'}</h2>
                    <p class="text-center mb-3">${input_output_examples && input_output_examples[0]?.output ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
                </div>
            </div>
        </div>
    `;
}