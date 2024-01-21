// Select the submit button
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function () {
    // Select the result container
    const resultContainer = document.querySelector('.result');
    resultContainer.innerHTML = `<p class="loader">Please Wait...</p>`;

    // Get the URL input value
    const urlInput = document.getElementById("url").value;

    // Check if the URL is not empty
    if (urlInput.trim() !== "") {
        // Fetch data from the API
        fetch(`https://seo-api-6z88.onrender.com/scrape?url=${urlInput}`)
            .then(response => {
                // Check for successful response (status code 200-299)
                if (response.ok) {
                    return response.json();
                } else {
                    // Handle the error response from the API
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }
            })
            .then(data => displayResult(data))
            .catch(error => {
                // Display an error message if the URL is invalid or API request fails
               
                resultContainer.innerHTML = "<p>Invalid URL or failed to fetch data</p>";
                console.log(error);
            });
    } else {
        // Display an error message if the URL is empty
        resultContainer.innerHTML = "<p>Please enter a valid URL</p>";
    }

    // Function to display the result
    function displayResult(data) {
        // Clear previous content
        resultContainer.innerHTML = '';

        //SEO Score


        // Display title
        const titleSection = document.createElement('h2');
        titleSection.innerText = 'Title';
        resultContainer.appendChild(titleSection);

        const titleList = document.createElement('ol');
        titleList.innerHTML = `
        <li><span id="highlight">Title:</span> <span id="data">${data.title.data}</span>
        <li><span id="highlight">Length:</span> <span id="data">${data.title.length} characters</span>
    
        ${
        data.title.data.length >= 50 && data.title.data.length <= 60
        ? `<li class="pass">Your Page Title is ${data.title.data.length} Characters and it's good</li>`
        : data.title.data.length >= 0 && data.title.data.length < 50
        ? `<li class="fail">Add more words for better results</li>`
        : data.title.data.length > 60
        ? `<li class="fail">Please reduce the title</li>`
        : `<li class="fail">No title found on this page</li>`
        }
        `;
        resultContainer.appendChild(titleList);

        // Display meta description
        const descriptionSection = document.createElement('h2');
        descriptionSection.innerText = 'Meta Description';
        resultContainer.appendChild(descriptionSection);

        const descriptionList = document.createElement('ol');
        descriptionList.innerHTML = `<li><span id="highlight">Description:</span> <span id="data">${data.description.data}</span></li>
                                     <li><span id="highlight">Description Length:</span> <span id="data">${data.description.length} Characters</span></li>
                                     ${
                                        data.description.length >= 50 && data.description.length <= 160
                                        ? `<li class="pass">Your Page Description is ${data.description.length} Characters and it's good</li>`
                                        : data.description.length >= 0 && data.description.length < 50
                                        ? `<li class="fail">Add More Content on Your Description</li>`
                                        : data.description.length > 160
                                        ? `<li class="fail">Please reduce  your Description</li>`
                                        : `<li class="fail">No title found on this page</li>`
                                        }
                                     `;
        resultContainer.appendChild(descriptionList);

// Display headings
const headingsSection = document.createElement('h2');
headingsSection.innerText = 'Headings';
resultContainer.appendChild(headingsSection);

const headingsList = document.createElement('ol');
headingsList.innerHTML = `
    <li>
        <span id="highlight">Total H1 Headings: </span>
        <span id="data">${data.headings.h1.total}</span>
    </li>
    ${data.headings.h1.total > 0 ? `
        <div id="headingss">
            ${data.headings.h1.list.map((heading) => `<p>${heading}</p>`).join('')}
        </div>` : " "
    }
    ${data.headings.h1.total == 0
        ? `<li class="fail">Keep One H1 Heading on Your Page</li>` :
        data.headings.h1.total > 1 ? `<li class="fail">Your Page Must Contain only One H1 Tag</li>` : `<li class="pass">Your Page has one H1 Tag and it's good</li>`
    }


    
    
    <li>
        <span id="highlight">Total H2 Headings: </span>
        <span id="data">${data.headings.h2.total}</span>
    </li>
    ${data.headings.h2.total > 0 ? `<div id="headingss">
    ${data.headings.h2.list.map((heading) => `<p>${heading}</p>`).join('')}
    </div>` : " "}

    ${data.headings.h1.total == 0
        ? `<li class="fail">Your Page Doesn't Contain any Sub Headings (H2)</li>` : `<li class="pass">Your Page contains Subheadings(H2)</li>`

    }

    <li>
        <span id="highlight">Total H3 Headings: </span>
        <span id="data">${data.headings.h3.total}</span>
    </li>
    ${data.headings.h3.total > 0 ? `<div id="headingss">
    ${data.headings.h3.list.map((heading) => `<p>${heading}</p>`).join('')}
    </div>` : " "}

    <li>
        <span id="highlight">Total H4 Headings: </span>
        <span id="data">${data.headings.h4.total}</span>
    </li>
    ${data.headings.h4.total > 0 ? `<div id="headingss">
    ${data.headings.h4.list.map((heading) => `<p>${heading}</p>`).join('')}
    </div>` : " "}

    <li>
        <span id="highlight">Total H5 Headings: </span>
        <span id="data">${data.headings.h5.total}</span>
    </li>
    ${data.headings.h5.total > 0 ? `<div id="headingss">
    ${data.headings.h5.list.map((heading) => `<p>${heading}</p>`).join('')}
    </div>` : " "}

    <li>
        <span id="highlight">Total H6 Headings: </span>
        <span id="data">${data.headings.h6.total}</span>
    </li>
    ${data.headings.h6.total > 0 ? `<div id="headingss">
    ${data.headings.h6.list.map((heading) => `<p>${heading}</p>`).join('')}
    </div>` : " "}
`;

resultContainer.appendChild(headingsList);
 
// Display images
const imagesSection = document.createElement('h2');
imagesSection.innerText = 'Images';
resultContainer.appendChild(imagesSection);

const imagesList = document.createElement('ol');

if (data.images.total === 0) {
    imagesList.innerHTML = `<li>No images found on this page</li>`;
} else {
    imagesList.innerHTML = `
    <li><span id="highlight">Total Images: </span> <span id="data">${data.images.total}</span></li>

    ${data.images.total > 0 ? `<div id="images">
    ${data.images.images_list.map(img => `
    <p><span id="highlight">Image Path: </span> ${img.image}</p>
    <p><span id="highlight">Alt: </span> ${img.alt_text}</p><br>`
    ).join('')}
    </div>` : ''}

    ${
        data.images.images_list.length !== data.images.images_list.filter(img => img.alt_text).length
        ? `<li class="fail">Some of your images have no Alt text. Include Alt text for each image on your page</li>`
        : (data.images.total !== data.images.images_list.filter(img => img.alt_text).length)
            ? `<li class="fail">Some of your images have no Alt text. Include Alt text for each image on your page</li>`
            : `<li class="pass">All of your images have Alt text</li>`
    }`;
}

resultContainer.appendChild(imagesList);


        // Display internal links
        const internalLinksSection = document.createElement('h2');
        internalLinksSection.innerText = 'Internal Links';
        resultContainer.appendChild(internalLinksSection);

        const internalLinksList = document.createElement('ol');
        internalLinksList.innerHTML = `<li><span id="highlight">Total Internal Links: </span> <span id="data">${data.internal_links.total}</span></li>
                                       <div id="internallinks">
                                           ${data.internal_links.list.map(link => `<a href="${link}">${link}</a>`).join('')}
                                       </div>`;
        resultContainer.appendChild(internalLinksList);

        // Display external links
        const externalLinksSection = document.createElement('h2');
        externalLinksSection.innerText = 'External Links';
        resultContainer.appendChild(externalLinksSection);

        const externalLinksList = document.createElement('ol');

        externalLinksList.innerHTML = `
        <li>
        <span id="highlight">Total External Links: </span>
        <span id="data">${data.external_links.total}</span>
        </li>
        ${data.external_links.list && data.external_links.list.length > 0 ?
        `<div id="externallinks">
        ${data.external_links.list.map(link => `<a href="${link}">${link}</a>`).join('')}
        </div>` :
        'No external links available'
        }`;

        resultContainer.appendChild(externalLinksList);

        // Display canonical tag
        const canonicalTagSection = document.createElement('h2');
        canonicalTagSection.innerText = 'Canonical Tag';
        resultContainer.appendChild(canonicalTagSection);

        const canonicalTagList = document.createElement('ol');
        canonicalTagList.innerHTML = `<li><span id="highlight">Is In the Page: </span> <span id="data">${data.canonical_tag.is_canonical}</span></li>
                                      <li><span id="highlight">Canonical Link: </span> <span id="data"> <a href="${data.canonical_tag.link}">${data.canonical_tag.link}</a></span></li>
                                      ${data.canonical_tag.is_canonical ? `<li class="pass">Your page contains Canonical Tag</li>` : `<li class="fail">Your page doesn't contain Canonical Tag</li>`}
                                      `;
        resultContainer.appendChild(canonicalTagList);

        // Google Analytics
        const analyticsSection = document.createElement('h2');
        analyticsSection.innerText = 'Google Analytics';
        resultContainer.appendChild(analyticsSection);
        const analyticsCheck = document.createElement('ol');
        analyticsCheck.innerHTML = `
            ${data.is_google_analytics ? `<li class="pass">Your Webpage is Connected with Google Analytics</li>` : `<li class="fail">Your Webpage is Not Connected with Google Analytics</li>`}
        `
        resultContainer.appendChild(analyticsCheck);

         // Schema
         const schemaSection = document.createElement('h2');
         schemaSection.innerText = 'Schema';
         resultContainer.appendChild(schemaSection);
         const schemaSectionCheck = document.createElement('ol');
         schemaSectionCheck.innerHTML = `
             ${data.schema_markup ? `<li class="pass">Your Webpage has Schema.org</li>` : `<li class="fail">Your Webpage doesn't has Schema.org</li>`}
         `
         resultContainer.appendChild(schemaSectionCheck);

          // Robot.txt
          const robotSection = document.createElement('h2');
          robotSection.innerText = 'Robots.txt';
          resultContainer.appendChild(robotSection);
          const robotCheck = document.createElement('ol');
          robotCheck.innerHTML = `
              ${data.is_robot_txt ? `<li>The robots.txt file is found on your page.</li>` : `<li>The robots.txt file is missing or unavailable.</li>`}
          `
          resultContainer.appendChild(robotCheck);



      // Display Open Graph tags
const ogTagsSection = document.createElement('h2');
ogTagsSection.innerText = 'Open Graph Tags';
resultContainer.appendChild(ogTagsSection);

// Display OG Title if present
if (data.og_tags && data.og_tags.og_title) {
  const ogTitle = document.createElement('p');
  ogTitle.innerHTML = `<span id="highlight">OG Title: </span> <span id="data">${data.og_tags.og_title}</span>`;
  resultContainer.appendChild(ogTitle);
} else {
  const noOgTitleMessage = document.createElement('p');
  noOgTitleMessage.innerText = 'OG Title is not present on the page.';
  resultContainer.appendChild(noOgTitleMessage);
}

// Display OG Description if present
if (data.og_tags && data.og_tags.og_description) {
  const ogDescription = document.createElement('p');
  ogDescription.innerHTML = `<span id="highlight">OG Description: </span> <span id="data">${data.og_tags.og_description}</span>`;
  resultContainer.appendChild(ogDescription);
} else {
  const noOgDescriptionMessage = document.createElement('p');
  noOgDescriptionMessage.innerText = 'OG Description is not present on the page.';
  resultContainer.appendChild(noOgDescriptionMessage);
}

// Display OG Type if present
if (data.og_tags && data.og_tags.og_type) {
  const ogType = document.createElement('p');
  ogType.innerHTML = `<span id="highlight">OG Type: </span> <span id="data">${data.og_tags.og_type}</span>`;
  resultContainer.appendChild(ogType);
} else {
  const noOgTypeMessage = document.createElement('p');
  noOgTypeMessage.innerText = 'OG Type is not present on the page.';
  resultContainer.appendChild(noOgTypeMessage);
}

// Display OG URL if present
if (data.og_tags && data.og_tags.og_url) {
  const ogUrl = document.createElement('p');
  ogUrl.innerHTML = `<span id="highlight">OG URL: </span> <span id="data"><a id="data" href="${data.og_tags.og_url}" target="_blank">${data.og_tags.og_url}</a></span>`;
  resultContainer.appendChild(ogUrl);
} else {
  const noOgUrlMessage = document.createElement('p');
  noOgUrlMessage.innerText = 'OG URL is not present on the page.';
  resultContainer.appendChild(noOgUrlMessage);
}

        

        const socialMediaLinksSection = document.createElement('h2');
        socialMediaLinksSection.innerText = 'Social Media Links';
        resultContainer.appendChild(socialMediaLinksSection);
        const socialMediaLinksList = document.createElement('ol');
        socialMediaLinksList.innerHTML = `${data.social_media_links.list.length > 0 ? `
        <div>
            <li><span id="highlight">Facebook: </span> <span id="data"> <a href="${data.social_media_links.list[0]}">${data.social_media_links.list[0]}</a></span></li>
            <li><span id="highlight">LinkedIn: </span> <span id="data"><a href="${data.social_media_links.list[1]}">${data.social_media_links.list[1]}</a></span></li>
            <li><span id="highlight">Twitter: </span> <span id="data"><a href="${data.social_media_links.list[2]}">${data.social_media_links.list[2]}</a></span></li>
        </div>` : '<p>No Social Media Links on This Page</p>'} `;

        resultContainer.appendChild(socialMediaLinksList);

         // Display security measurements
         const securitySection = document.createElement('h2');
         securitySection.innerText = 'Security';
         resultContainer.appendChild(securitySection);
 
         const securityList = document.createElement('ol');
         data.security.forEach(securityMeasure => {
             const listItem = document.createElement('li');
             listItem.innerHTML = `<span id="highlight">${securityMeasure.name}:</span> <span id="data">${securityMeasure.result ? 'Yes' : 'No'}</span>`;
             securityList.appendChild(listItem);
         });
         resultContainer.appendChild(securityList);
 
         // Display common words
         const commonWordsSection = document.createElement('h2');
         commonWordsSection.innerText = 'Common Words';
         resultContainer.appendChild(commonWordsSection);
 
         const commonWordsList = document.createElement('ol');
         commonWordsList.innerHTML = `<li><span id="highlight">Total Common Words:</span> <span id="data">${data.common_words.common_words_total}</span></li>
                                      <div id="commonwords">
                                          ${data.common_words.list.map(word => `<p>${word}</p>`).join('')}
                                      </div>`;
         resultContainer.appendChild(commonWordsList);
    }
});
 

