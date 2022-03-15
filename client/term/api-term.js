const create = async (term) => {
  try {
      let response = await fetch('/api/terms/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          // 'Content-Type': 'application/json' //use form now
        },
        body: term
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const list = async (signal) => {
  try {
    let response = await fetch('/api/terms/', {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const read = async (params, signal) => {
  try {
    let response = await fetch('/api/terms/' + params.id, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const update = async (params, term) => {
  try {
    let response = await fetch('/api/terms/' + params.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
      },
      body: term
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const remove = async (params) => {
  try {
    let response = await fetch('/api/terms/' + params.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  create,
  list,
  read,
  update,
  remove
}