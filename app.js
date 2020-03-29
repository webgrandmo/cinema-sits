(function () {

    const container = document.querySelector('.container'),
        seats = document.querySelectorAll('.row .seat:not(.occupied)'),
        count = document.getElementById('count'),
        total = document.getElementById('total'),
        movieSelect = document.getElementById('movie-selector');
    let ticketPrice = +movieSelect.value;
    
    populateUI();
    
    function populateUI() {
        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
        if(selectedSeats && selectedSeats.length) {
            seats.forEach( (seat, index) => {
                if(selectedSeats.indexOf(index) > -1) {
                    seat.classList.add('selected');
                }
            });
        }

        const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    function chooseSeat(event) {
        checkIfSeat(event);
    }
    function checkIfSeat(e) {
        if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
            e.target.classList.toggle('selected');
        }

        updateCountAndPrice();
    }
    function saveMovies(movieSelector, moviePrice) {
        localStorage.setItem('selectedMovieIndex', movieSelector);
        localStorage.setItem('selectedMoviePrice', moviePrice);
    }
    function updateCountAndPrice() {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');
        const selectedCount = selectedSeats.length;
        count.innerText = selectedCount;
        total.innerText = selectedCount * ticketPrice;

        const seatIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat));
        localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
    }

    function updateMoviePrice(e) {
        ticketPrice = e.target.value;
        saveMovies(e.target.selectedIndex, e.target.value);
        updateCountAndPrice();
    }

    container.addEventListener('click', chooseSeat);
    movieSelect.addEventListener('change', updateMoviePrice);

    updateCountAndPrice();

}());
