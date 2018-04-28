$(document).ready(function() {
    // Getting references to the name input and author container, as well as the table body
    var nameInput = $("#burger-name");
    var authorList = $("tbody");
    var burger = $(".burger-container");
    // Event listeners on form for new object
    //  button to delete burger
    $(document).on("submit", "#burger-form", handleBurgerFormSubmit);
    $(document).on("click", ".delete-author", handleDeleteButtonPress);
  
    // Getting the initial list of Authors
    getBurger();
  
    // A function to handle what happens when the form is submitted to create a new Author
    function handleBurgerFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the name fields hasn't been filled out
      if (!nameInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertAuthor function and passing in the value of the name input
      upsertBurger({
        name: nameInput
          .val()
          .trim()
      });
    }
  
    // A function for creating an author. Calls getAuthors upon completion
    function upsertburger(burgerInfo) {
      $.post("/api/burger", burgerInfo)
        .then(getBurger);
    }
  
    // Function for creating a new list row for authors
    function createBurgerRow(burgerData) {
      console.log(burgerData);
      var newTr = $("<tr>");
      newTr.data("burger", burgerData);
      newTr.append("<td>" + burgerData.name + "</td>");
    //   newTr.append("<td># of posts will display when we learn joins in the next activity!</td>");
    //   newTr.append("<td><a href='/blog?burger_id=" + burgerData.id + "'>Go to Posts</a></td>");
    //   newTr.append("<td><a href='/cms?burger_id=" + burgerData.id + "'>Create a Post</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-burger'>Delete burger</a></td>");
      return newTr;
    }
  
    // Function for retrieving authors and getting them ready to be rendered to the page
    function getBurger() {
      $.get("/api/burgers", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createBurgerRow(data[i]));
        }
        renderBurgList(rowsToAdd);
        nameInput.val("");
      });
    }
  
    // A function for rendering the list of authors to the page
    function renderBurgList(rows) {
      burgerList.children().not(":last").remove();
      burgerContainer.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        burgerList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no authors
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create an Author before you can create a Post.");
      burgerContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("burger");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/burger/" + id
      })
        .then(getBurger);
    }
  });
  