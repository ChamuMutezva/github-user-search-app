import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import axios from 'axios'
import Form from './Form'
import Card from './Card'

const Main = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        return axios.get("https://api.github.com/users/octocat")
            .then(response => {
                setUser(response.data)
            })

    }, [])

    async function handleSubmit(evt) {

        evt.preventDefault()
        const err__span = document.querySelector(".err")
        const search__element = document.querySelector(".search__user")
        const searchValue = search__element.value
        const url = "https://api.github.com/users/"
        err__span.classList.remove("err__show")

        await
            axios
                .get(`${url}${searchValue}`)
                .then(response => {
                    if (response.status >= 200 && response.status <= 299) {
                        setUser(response.data)
                        search__element.value = ""
                        gsap.from(".card__profile__img", { opacity: 0, duration: 2, ease: "bounce" })
                    } else {
                        throw Error(response.statusText);
                    }

                })
                .catch(err => {
                    if (err.response.status === 404) {
                        err__span.classList.add("err__show")
                        gsap.from(".err", { opacity: 0, duration: 3, ease: "bounce" })
                    }
                })

    }

  

    return (
        <main className="main">

            <Form handleSubmit={handleSubmit} />
            {/* check if the user data is populated then show the Card.
            This is to prevent nan and undefined values to be shown on loading */}
            {Object.keys(user).length !== 0 ? <Card user={user} /> : ""}

        </main>
    )
}

export default Main