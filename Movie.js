function Movie(data) {
    Object.assign(this, data)
    let { poster, title, imdbRating, runtime, genre, imdbID, plot } = this
    this.renderHtml = () => {
        if(poster === "N/A") {
            poster = "./images/no_image.jpg"
        }
        return `
        <div class="search">
            <img class="search--img" src="${poster}">
            <div class="search--info">
                <div class="search--title-wrapper">
                    <h3 class="search--title">${title}</h3>
                    <p class="search--rating"><i class="fa-solid fa-star"></i> ${imdbRating}</p>
                </div> ${ /* TITLE WRAPPER */""}
                <div class="search--details-wrapper">
                    <p class="search--runtime">${runtime}</p>
                    <p class="search--genre">${genre}</p>
                    <button class="search--add-btn" data-add=${imdbID}>
                        <i class="fa-solid fa-circle-plus"></i>Watchlist
                    </button>
                </div> ${/* DETAILS WRAPPER */""}
                <p class="search--plot">${plot}</p>
            </div> ${/* INFO */""}
        </div> ${/* SEARCH */""}
        `
    }
}

export default Movie