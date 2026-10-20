(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  const cw1_3 = document.getElementById('cw1.3')
  const postIdField = document.getElementById('post-id')

  const postForm = document.getElementById('post-form')

  example.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", async function () {
    //DONE
    answer.innerHTML = ''
    answer.textContent = 'Loading...'
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const jsonArray = await response.json()
    const list = document.createElement('ul')
    for (let index = 0; index < jsonArray.length; ++index) {
      const element = document.createElement('li')
      element.textContent = JSON.stringify(jsonArray[index])
      list.appendChild(element)
    }
    answer.innerHTML = ''
    answer.appendChild(list)
  })

  cw1_3.addEventListener('click', async () => {
    const postId = postIdField.value
    answer.innerHTML = ''
    answer.textContent = 'Loading...'
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
    const json = await response.json()
    answer.textContent = JSON.stringify(json)
  })

  postForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const data = new FormData(postForm)
    answer.innerHTML = ''
    answer.textContent = 'Processing...'
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        userId: 1,
        title: data.get('title'),
        body: data.get('body')
      })
    })
    if (response.status === 500) {
      answer.textContent = 'Error when posting: ' + response.status
      return
    }
    const json = await response.json()
    answer.textContent = 'Dodano nowy post o ID ' + json['id']
  })

  cw2.addEventListener("click", function () {
    //TODO
  })

  cw3.addEventListener("click", function () {
    //TODO
  })

})();
