document.addEventListener("DOMContentLoaded", function() {
  // 1. See the first movie
  fetch("/films/1")
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      updateMovieDetails(data);
    })
    .catch(function(error) {
      console.error("Error fetching film data:", error);
    });

  // 2. See a menu of all movies 
  fetch("/films")
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function(data) {
      var filmsList = document.getElementById("films");
      data.forEach(function(film) {
        var li = document.createElement("li");
        li.textContent = film.title;
        li.classList.add("film", "item");
        filmsList.appendChild(li);
      });
    })
    .catch(function(error) {
      console.error("Error fetching films data:", error);
    });

  // Function to update movie details on the page
  function updateMovieDetails(data) {
    document.getElementById("title").textContent = data.title;
    document.getElementById("runtime").textContent = data.runtime + " minutes";
    document.getElementById("film-info").textContent = data.description;
    document.getElementById("showtime").textContent = data.showtime;
    document.getElementById("ticket-num").textContent = data.capacity - data.tickets_sold;
    document.getElementById("poster").src = data.poster;

    // Update buy ticket button
    let buyTicketButton = document.getElementById("buy-ticket");
    if (data.tickets_sold >= data.capacity) {
      buyTicketButton.textContent = "Sold Out";
      buyTicketButton.disabled = true;
    } else {
      buyTicketButton.textContent = "Buy Ticket";
      buyTicketButton.disabled = false;
    }
  }
});

// Buy Movie Ticket
const movies = [
  { title: "THE GIANT GILA MONSTER", description: "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature", runtime: 120, showtime: "5:00 PM", tickets: 100, fontSize: "20px" },
  { title: "MANOS : THE HANDS OF FATE", fontSize: "18px" },
  { title: "TIME CHASERS", fontSize: "18px" },
  { title: "THE TOUCH OF SATAN", fontSize: "18px" },
  { title: "SANTA CLAUS CONQUERS THE MARTIANS", fontSize: "18px" },
  { title: "TRACK OF THE MOON BEAST", fontSize: "18px" },
  { title: "THE SKYDIVERS", fontSize: "18px" },
  { title: "THE KILLER SHREWS", fontSize: "18px" },
  { title: "PROJECT MOON BASE", fontSize: "18px" },
  { title: "THE GIANT SPIDER INVASION", fontSize: "18px" },
  { title: "CATALINA CAPER", fontSize: "18px" },
  { title: "SECRET AGENT SUPER DRAGON", fontSize: "18px" },
  { title: "WILD REBELS", fontSize: "18px" },
  { title: "DANGER: DIABOLIK", fontSize: "18px" },
  { title: "VILLAGE OF THE GIANTS", fontSize: "18px" }
];

// Function to populate movie list
function populateMovieList() {
  const filmsList = document.getElementById("films");
  filmsList.innerHTML = ""; // Clear existing list
  
  movies.forEach(movie => {
    const listItem = document.createElement("li");
    listItem.classList.add("film", "item");
    listItem.textContent = movie.title;
    listItem.style.fontSize = movie.fontSize; // Set font size
    filmsList.appendChild(listItem);

    // Add event listener to each movie item
    listItem.addEventListener("click", () => {
      showMovieDetails(movie);
    });
  });
}

// Function to show movie details
function showMovieDetails(movie) {
  document.getElementById("poster").src = "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg";
  document.getElementById("title").textContent = movie.title;
  document.getElementById("runtime").textContent = `${movie.runtime} minutes`;
  document.getElementById("film-info").textContent = movie.description;
  document.getElementById("showtime").textContent = movie.showtime;
  document.getElementById("ticket-num").textContent = movie.tickets;
}

// Function to handle ticket purchase
document.getElementById("buy-ticket").addEventListener("click", () => {
  const ticketsRemaining = parseInt(document.getElementById("ticket-num").textContent);
  if (ticketsRemaining > 0) {
    const updatedTickets = ticketsRemaining - 1;
    document.getElementById("ticket-num").textContent = updatedTickets;
  }
});

// Populate movie list on page load
populateMovieList();


