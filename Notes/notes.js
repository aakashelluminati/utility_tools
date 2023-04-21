$(document).ready(function() {

    var isSortOn = false;

    $('#sort-switch').on('change', function() {
        isSortOn = $(this).prop('checked');
        renderNotesList()
    });

    var $noteTitleInput = $('#note-title-input');
    var $noteContentInput = $('#note-content-input');
    var $saveButton = $('#save-button');
    var $notesList = $('#notes-list');
  
    // Load notes from local storage
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
  
    // Render notes list
    function renderNotesList() {
        console.log("renderNotesList");
      $notesList.empty();
      for (var i = 0; i < notes.length; i++) {
        var note = notes[i];
        var $noteItem = $('<li>').addClass('list-group-item copy-button').attr('data-note-id', i);
        var $noteTitle = $('<div>').addClass('note-title').text(note.title);
        var $noteContent = $('<div>').addClass('note-content wraptext').text(note.content.replace(/\n/g, '\r\n'));
        var $deleteButton = $('<i>').addClass('fas fa-trash-alt delete-button pull-right').attr('title', 'Delete Note');
        
        $noteItem.append($noteTitle).append($deleteButton).append($noteContent);
        $notesList.append($noteItem);
      }

      if (isSortOn) {
          // Make notes list sortable
          $notesList.sortable({
            update: function(event, ui) {
              // Get the current order of notes list items and store it in local storage
              var noteIds = $notesList.sortable("toArray", { attribute: "data-note-id" });
              var sortedNotes = [];
              for (var i = 0; i < noteIds.length; i++) {
                sortedNotes.push(notes[noteIds[i]]);
              }
              localStorage.setItem('notes', JSON.stringify(sortedNotes));
            }
          });
      }
    }
  
    // Add click event listener to note item to mark it as active
    $notesList.on('click', '.list-group-item', function() {
      $(this).addClass('active').siblings().removeClass('active');
    });
  
    // Add click event listener to delete button to remove note item
    $notesList.on('click', '.delete-button', function(event) {
      var noteId = $(event.target).closest('.list-group-item').attr('data-note-id');
      notes.splice(noteId, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      renderNotesList();
    });


    // Add click event listener to delete button to remove note item
    $notesList.on('click', '.copy-button', function(event) {
        var noteId = $(event.target).closest('.list-group-item').attr('data-note-id');
        console.log(noteId);
        console.log(notes[noteId]);
        // localStorage.setItem('notes', JSON.stringify(notes));
        // renderNotesList();

        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = notes[noteId].content;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
    
        Toastify({
          text: "Note copied to clipboard!",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          backgroundColor: "linear-gradient(to right, #337ab7 0%, #1e5092 100%)",
          stopOnFocus: true,
        }).showToast();

      });

  
    $saveButton.on('click', function(event) {
        event.preventDefault();
        const noteTitle = $noteTitleInput.val();
        const noteContent = $noteContentInput.val();
        
        if (!noteTitle && !noteContent) {
            Toastify({
              text: 'Please enter note title and content',
              duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom",
            position: "right",
            backgroundColor: "linear-gradient(to right, #337ab7 0%, #1e5092 100%)",
            stopOnFocus: true,
            }).showToast();
            return;
          }

        const newNote = {
          id: Date.now(),
          title: noteTitle || '',
          content: noteContent || '',
          active: false
        };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotesList();
        $noteTitleInput.val('');
        $noteContentInput.val('');
    })
    
    // $notesList.on('click', '.list-group-item', function(event) {
    //     event.preventDefault();
    //     const noteId = $(this).data('note-id');
    //     notes.forEach(function(note) {
    //       if (note.id === noteId) {
    //         note.active = true;
    //       } else {
    //         note.active = false;
    //       }
    //     });
    //     localStorage.setItem('notes', JSON.stringify(notes));
    //     renderNotesList();
    //   });

      $notesList.on('click', '.delete-button', function(event) {
        event.stopPropagation();
        const noteId = $(this).data('note-id');
        const noteIndex = notes.findIndex(function(note) {
          return note.id === noteId;
        });
        if (noteIndex !== -1) {
          notes.splice(noteIndex, 1);
          localStorage.setItem('notes', JSON.stringify(notes));
          renderNotesList();
        }
      });

    //   $notesList.sortable({
    //     update: function() {
    //       const newNotes = [];
    //       $notesList.children('.list-group-item').each(function() {
    //         const noteId = $(this).data('note-id');
    //         const note = notes.find(function(note) {
    //           return note.id === noteId;
    //         });
    //         if (note) {
    //           newNotes.push(note);
    //         }
    //       });
    //       notes = newNotes;
    //       localStorage.setItem('notes', JSON.stringify(notes));
    //     }
    //   });
      
      // Render the initial list of notes
      renderNotesList();

})
      