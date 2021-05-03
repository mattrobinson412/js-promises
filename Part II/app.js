const baseURL = "http://deckofcardsapi.com/";
const section = $(".section")[0]

// // #1 //
// axios
//     .get(`${baseURL}/api/deck/new/shuffle/?deck_count=1`)
//     .then(p1 => {
//         let deck_id = p1.data.deck_id
//         console.log(deck_id)
//         return axios.get(`${baseURL}/api/deck/${deck_id}/draw/?count=1`)
//     })
//     .then(p2 => {
//         console.log(`${p2.data.cards[0].value} of ${p2.data.cards[0].suit}`)

//     });

// // #2 //
// axios
//     .get(`${baseURL}/api/deck/new/shuffle/?deck_count=1`)
//     .then(p1 => {
//         let deck_id = p1.data.deck_id
//         console.log(deck_id)
//         return axios.get(`${baseURL}/api/deck/${deck_id}/draw/?count=1`)
//     })
//     .then(p2 => {
//         console.log(`${p2.data.cards[0].value} of ${p2.data.cards[0].suit}`)
//         return axios.get(`${baseURL}/api/deck/f9dyoum5qkht/draw/?count=1`)
//     })
//     .then(p3 => {
//         console.log(`${p3.data.cards[0].value} of ${p3.data.cards[0].suit}`)
//     });


// #3 //
function shuffleDeck() {
    let res = axios.get(`${baseURL}/api/deck/new/shuffle/?deck_count=1`)
    return drawCard(res);
};

function addCard(res) {
    res.then(p1 => {
        return axios.get(`${baseURL}/api/deck/${p1.data.deck_id}/draw/?count=1`)
    })
    .then(p2 => {
        let rem = p2.data.remaining
        endDraw(rem)
        let card = p2.data.cards[0];
        return displayCard(card);
    })
};

function displayCard(card) {
    let cardPile = $(".deck")[0]
    $(cardPile).append(`
        <div class="card bg-dark text-white my-4" 
            style="width: 15rem; position: absolute;">
            <img class="card-img" src="${card.images.png}" 
                alt="${card.value} of ${card.suit}">
        </div>`);
};

function endDraw(rem) {
    console.log(rem);
    if (rem === 0) {
        $("body").off();
        let cards = document.querySelectorAll(".card")
        let drawBtn = document.querySelector(".btn-success")
        $(cards).remove()
        $(drawBtn).remove()

        $(section)
            .append(`<button type="button" class="restart btn btn-info px-4">Reshuffle Deck</button>`)
        return reshuffleDeck();
    }
};

function reshuffleDeck() {
    $("body").on("click", function(e) {
        if (e.target.tagName === "BUTTON") {
            location.reload()
        }
    })
    
};

function drawCard(res) {
    $("body").on("click", function(e) {
        if (e.target.tagName === "BUTTON") {
            addCard(res)
        }
    })
};

shuffleDeck();
