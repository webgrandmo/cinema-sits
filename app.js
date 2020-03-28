(function () {

    const container = document.querySelector('.container'),
        seats = document.querySelectorAll('.row .seat:not(.occupied)'),
        count = document.getElementById('count'),
        total = document.getElementById('total'),
        movieSelect = document.getElementById('movie-selector');
    let ticketPrice = +movieSelect.value;

    function chooseSeat(event) {
        checkIfSeat(event);
    }
    function checkIfSeat(e) {
        if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
            e.target.classList.toggle('selected');
        }

        updateCountAndPrice();
    }
    function updateCountAndPrice() {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');
        const selectedCount = selectedSeats.length;
        count.innerText = selectedCount;
        total.innerText = selectedCount * ticketPrice;
    }

    function updateMoviePrice(e) {
        ticketPrice = e.target.value;
        updateCountAndPrice();
    }

    container.addEventListener('click', chooseSeat);
    movieSelect.addEventListener('change', updateMoviePrice)

}())
