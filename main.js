// Frank Goshko 12/1/21
// F1 Racer Api Assignment

const getInput = async (season, round) => {
    // let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    let response = await axios.get(`./f1.json`)
    return response.data.MRData.StandingsTable
}

const DOM_Elements = {
    standings_table: '.standings-table'
}

const create_rows = (num, firstName, lastName, Sponsor, Nationality, Points) => {
    const html =
        `<tr>
            <td>${num}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${Sponsor}</td>
            <td>${Nationality}</td>
            <td>${Points}</td>
        </tr>`;

    document.querySelector(DOM_Elements.standings_table).insertAdjacentHTML('beforeend', html)
}

const loadData = async (season, round) => {
    const standingsTable = await getInput(season, round);

    driverStandings = standingsTable.StandingsLists[0].DriverStandings;
    console.log(driverStandings)
    // document.getElementById("table standings-table").innerHTML = ''
    // standingsTable.innerHTML = ''
    driverStandings.innerHTML = ''
    for (let y = 0; y < driverStandings.length && y < 7; y++) {
        create_rows(y + 1, driverStandings[y].Driver.givenName, driverStandings[y].Driver.familyName, driverStandings[y].Constructors[0].name, driverStandings[y].Driver.nationality, driverStandings[y].points)
    }
}

const form = document.querySelector('#dataForm')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let season = document.querySelector('#season');
    let round = document.querySelector('#round');
    console.log(season.value, round.value);

    loadData(season.value, round.value);
})

form.addEventListener('reset', (event) => {
    let sT = document.getElementById("standingsTable")
    for (let i = sT.children.length - 1; i >= 1; i--) {sT.children[i].remove()}  
})