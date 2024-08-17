function loadXMLData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.xml', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var xml = xhr.responseXML;
                var books = xml.getElementsByTagName('book');
                console.log('Number of books:', books.length); // Log the number of books

                var booksList = document.getElementById('booksList');
                var tocList = document.createElement('ul');

                for (var i = 0; i < books.length; i++) {
                    var id = books[i].getAttribute('id');
                    var title = books[i].getElementsByTagName('title')[0].textContent;
                    var author = books[i].getElementsByTagName('author')[0].textContent;
                    var year = books[i].getElementsByTagName('year')[0].textContent;
                    var genre = books[i].getElementsByTagName('genre')[0].textContent;

                    var section = document.createElement('section');
                    section.id = id;
                    section.className = 'book-section';
                    section.innerHTML = `
                        <h2>${title}</h2>
                        <p>Author: ${author}</p>
                        <p>Year: ${year}</p>
                        <p>Genre: ${genre}</p>
                    `;
                    booksList.appendChild(section);

                    var listItem = document.createElement('li');
                    var link = document.createElement('a');
                    link.href = '#' + id;
                    link.textContent = title;
                    listItem.appendChild(link);
                    tocList.appendChild(listItem);
                }

                document.getElementById('toc').appendChild(tocList);
            } else {
                console.error('Failed to load XML data:', xhr.status, xhr.statusText);
            }
        }
    };
    xhr.send();
}

function hideFooter() {
    var footer = document.getElementById('footer');
    footer.style.display = 'none';
}

function handleFeedback(response) {
    alert('You clicked ' + response);
}

window.onload = loadXMLData; // Load XML data when the page loads
