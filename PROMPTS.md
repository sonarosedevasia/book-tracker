# Prompt log

## Prompt 1
**What I asked:**
I'm  building a Book Tracker web page. I want to use plain HTML, CSS and JavaScript only, with no frameworks and no backend.

Features: add a book (title, author, status: To read / Reading / Finished) with title and author required; show the list newest first; search by title or author; change a book's status; and keep the data after a page refresh using localStorage.

My own requirements: I want a calm, simple design with light colours and a clean readable font. It should work well on a phone screen. Error messages should appear right under the box that has the problem. 

Do NOT write any code yet. First tell me:
1. Which files you will create and what each one does.
2. What each book object will look like, and why each field is needed.
3. How newest-first ordering will work.
4. How saving and loading with localStorage will work.
5. In what order we should build the features, one small step at a time.

**What happened:**
Claude proposed using index.html, style.css and app.js. It suggested storing each book with an id, title, author, status and createdAt timestamp. It explained using an array for the books, sorting by createdAt for newest-first order, and localStorage with JSON for saving and loading.
**What I decided or changed myself:**
I decided to build the application one small feature at a time and test each feature before moving to the next one.


## Prompt 2
**What I asked:**
Your plan sorts newest-first in two places: unshift when adding, and sort by createdAt when rendering. Isn't one enough? Which one should we keep, and why? Also, what should happen if two books are added in the same millisecond, or if localStorage contains broken data? Answer briefly, and don't write any code yet.

**What happened:**
Claude explained that using `unshift()` alone is enough because each new book is inserted at the beginning of the array and the array order is preserved when saved to localStorage. It also explained that corrupted localStorage data should be handled safely instead of crashing the app.

**What I decided or changed myself:**
I decided to keep `unshift()` as the single method for newest-first ordering. I also decided to use a unique ID such as `crypto.randomUUID()` and handle broken localStorage data by safely falling back to an empty list.

## Prompt 3
**What I asked:**
Go with that decision: keep unshift only, no extra sorting. Now build steps 1 to 3 of your plan only: the HTML structure, the calm styling, and adding books. Create index.html, style.css and app.js.

Include the form with Title, Author and a Status dropdown (To read, Reading, Finished), and an Add button. When I click Add, the new book appears at the top of the list showing its title, author and a status label. Trim spaces before checking. If the title is empty, show "Please enter a title" directly under the title box. If the author is empty, show "Please enter an author" under the author box. Clear each error when I start typing in that box.

Use crypto.randomUUID() for ids. Do not add search, status changing or localStorage yet. Use simple, readable code with short comments, because I need to explain it.

**What happened:** 
The form and list worked, and new books appeared at the top with a coloured status label.

**What I decided or changed myself:** 
I tested adding a book with the status "Reading" and confirmed that it appeared at the top with the correct Reading status label.

## Prompt 4
**What I asked:** 
Now add localStorage saving only. Save the books array under the key 'book_tracker_books' every time a book is added. Load it when the page opens and render it. Use the safe loading we discussed: wrap JSON.parse in try...catch, check Array.isArray, and fall back to an empty array if the data is broken. Make sure every field is saved, including status. Keep unshift as the only ordering. Only change what's needed, and don't touch the styling.

**What happened:** 
Books were saved in localStorage and remained after refreshing. I also tested broken localStorage data by storing "hello". After refreshing, the page loaded normally instead of crashing and showed an empty book list.

**What I decided or changed myself:** 
I kept the safe loading approach so corrupted localStorage data does not break the application.

## Prompt 5
**What I asked:** 
Now add search only. Put a search box above the book list. As I type, show only books whose title or author contains the text, ignoring capital letters, so "ben", "BEN" and "Ben" all find "Aadujeevitham" by Benyamin. Ignore extra spaces around what I type. If nothing matches, show the message "No books found. Try a different word." Clearing the box shows all books again. Search must only filter what is displayed and must not change or delete the saved list in localStorage. Don't change anything else.

**What happened:** 
The search worked for titles and authors, including different capitalizations and spaces. The "No books found. Try a different word." message appeared when there were no matches. Clearing the search showed all books again, and refreshing did not remove any books.

**What I decided or changed myself:** 
I tested the search with different words, capitalization, spaces, and after refreshing the page.

## Prompt 6
**What I asked:** 
Now add status changing only. On each book in the list, add a dropdown with To read, Reading and Finished, set to that book's current status. When I change it, find the book by its id, update its status, save the list to localStorage, and update the label immediately. It must work while a search is active, without clearing the search box or the filtered results. Don't change anything else.

**What happened:**
The status changed immediately, stayed changed after refreshing, and changing a status while searching kept the search active. When two books had the same title and author, changing one did not change the other because each book had its own unique id.

**What I decided or changed myself:** 
I tested status changes with normal books, while searching, and with duplicate books to make sure the correct book was updated.

## Prompt 7
**What I asked:**
Now add three extras, only these. First, a delete button on each book that asks "Delete this book?" before removing it, finds the book by id, and updates localStorage. Second, counts shown above the list in the format "1 finished, 1 reading, 1 to read", which update after every add, delete or status change. Third, check the layout on a phone-sized screen: the form, search box, book cards and status dropdown must not overflow or overlap, and long titles must wrap. Don't change how search, saving or status changing work.

**What happened:** 
Delete confirmation worked correctly, cancelling kept the book and confirming removed only the selected book. The counts updated after adding, deleting and changing status. The mobile layout fit correctly without overflow or overlap.

**What I decided or changed myself:** 
I tested deletion, counts, searching while deleting, and the layout at a phone-sized screen.

## Prompt 8
**What I asked:** 
Now redesign only the look of the app, using style.css and the HTML structure. Do not change how any feature works. Add, search, status change, delete, counts and localStorage must behave exactly as they do now.

Concept: a cozy personal library. Use a warm dark-wood and cream colour palette with one bright accent colour. Use a serif font like Playfair Display or Lora for headings and a clean sans-serif for the rest (load from Google Fonts). Give the page a header with a small book icon and the title "Book Tracker", plus a short friendly tagline.

Show each book as a card that looks like a book spine or cover: a coloured left edge, a different soft colour for each status (To read, Reading, Finished), and the status shown as a ribbon-style bookmark. Show the counts as three small stat tiles at the top. Make the form look like an index card. Add gentle hover effects and a smooth fade-in when a book is added. Style the empty state with a friendly message like "Your shelf is empty. Add your first book!".

It must stay fully readable and usable on a phone, with no overflow, and long titles must wrap. Do not use any images that need downloading; use CSS, emoji or inline SVG only.

**What happened:** 
The app was visually redesigned while keeping the existing functionality unchanged.

**What I decided or changed myself:** 
I checked the redesigned app on a phone-sized screen and confirmed that the layout remained readable and usable without overflow.

## Prompt 9
**What I asked:**
Make these visual changes only. Do not change how any feature works. Add, search, status change, delete, counts and localStorage must behave exactly as they do now.

1. Background: the dark brown is too heavy. Replace it with a light, professional look: a soft warm off-white or light stone background (around #f5f1ea), with the dark brown kept only for the header area and as the accent colour for buttons and text. Keep good contrast and readability.
2. Header: keep the title "Book Tracker". Remove the tagline "A cozy personal sanctuary for every book in your journey" and replace it with this quote in italics: "A room without books is like a body without a soul." followed by a small "attributed to Cicero".
3. Button: change the text "Shelve Book" to "Add Book".
4. Desktop layout: the app currently looks like a narrow phone column on a laptop. On screens wider than 900px, use a wider container (about 1100px max) with two columns: the Add Book form on the left and the My Bookshelf section on the right. Keep the single-column layout on phone and tablet screens.
5. There is a small black dot below the Add Book button. Find what causes it and remove it.

Keep it fully usable on phone screens with no overflow.

**What happened:**
The visual and layout changes were applied without changing how the features work.

**What I decided or changed myself:** 
I checked the desktop layout and confirmed that the Add Book form and My Bookshelf section were displayed side by side on a wide screen.

## Prompt 10
**What I asked:** Make these small changes only. Do not change how any feature works. Add, search, status change, delete, counts and localStorage must behave exactly as they do now.

1. On screens wider than 900px, make the "Library Catalog Card" form box and the "My Bookshelf" box the same height, so they line up at the top and the bottom. Use CSS grid or flex stretch. If the bookshelf list gets long, make only the list area scroll inside the box (with a sensible max height) so the form box doesn't stretch endlessly.
2. Remove the "CAT. № 01" text from the top right of the Library Catalog Card.
3. Change the quote under the title to: "A reader lives a thousand lives before he dies." with the attribution "George R.R. Martin, A Dance with Dragons" in small text.

Keep the single-column layout on phone and tablet screens, with no overflow.

**What happened:**
The Library Catalog Card and My Bookshelf boxes were made the same height on desktop, with the book list scrolling internally when it becomes long. The "CAT. № 01" label was removed, and the quote and attribution were changed as requested. The existing functionality remained unchanged, and the single-column mobile/tablet layout was preserved.

**What I decided or changed myself:** 
I checked the desktop layout to confirm that the two boxes line up correctly, the book list can scroll inside the bookshelf, and the new quote and removed catalog label appear correctly. I also checked that the phone/tablet layout remains single-column without overflow.

## Prompt 11
**What I asked:** Add one more stat tile showing the total number of books, labelled "Total", as the first tile before Finished, Reading and To read. It must update after every add, delete or status change, and show 0 when the shelf is empty. Match the style of the other tiles with a neutral dark brown accent. On desktop show the four tiles in one row. On phone screens show them in a 2 by 2 grid with no overflow. Don't change how any feature works.

**What happened:**
The Total stat tile was added as the first tile before Finished, Reading and To read. The total count updates after adding, deleting and changing a book's status, and shows 0 when the shelf is empty. The four tiles display in one row on desktop and a 2×2 grid on phone screens.

**What I decided or changed myself:** 
I checked the stat tiles and confirmed that Total appears first and that the four tiles fit correctly in a 2×2 grid on a phone-sized screen.

## Prompt 12
**What I asked:** 
Fix this layout problem only. Do not change how any feature works. Add, search, status change, delete, counts and localStorage must behave exactly as they do now.

On screens wider than 900px, the Library Catalog Card form is stretching to match the height of the My Bookshelf box, which pushes the Add Book button to the bottom with a large empty gap above it. Change it so that:
1. The form card keeps its natural height, with the Add Book button directly below the Reading Status field, and stays aligned to the top of the page (align-self: start). Make it sticky so it stays visible while the bookshelf list scrolls.
2. The My Bookshelf box has a maximum height of about 80vh, and only the book list inside it scrolls when there are many books. The title, stat tiles and search box stay fixed at the top of that box.
3. On phone and tablet screens keep the single-column layout, with no overflow.

**What happened:**
This prompt fixed a bug from Prompt 10. I had asked for the form box and the bookshelf box to be the same height. The AI did that, but the form box stretched to match the long bookshelf, so the Add Book button was pushed to the bottom with a big empty gap above it. After this prompt the form keeps its natural height, the button sits directly under the Reading Status field, and only the book list scrolls inside the bookshelf box.

**What I decided or changed myself:**
I found the bug by testing with several books and a very long title. I wrote the exact problem into the prompt (the gap, the button position, what the layout should be) instead of just saying "fix the layout". After the fix I retested adding, searching, changing status, deleting and refreshing.