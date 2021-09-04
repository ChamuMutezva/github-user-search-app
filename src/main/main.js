import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import axios from 'axios'
import LocationImg from '../assets/icon-location.svg'
import CompanyImg from '../assets/icon-company.svg'
import Blog from '../assets/icon-website.svg'
import Twitter from '../assets/icon-twitter.svg'

const Main = (props) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        console.log("useEffect in action");
        return axios.get("https://api.github.com/users/octocat")
            .then(response => {
                console.log("promise fullfilled");
                setUser(response.data)
                console.log(response.data)
            })

    }, [])

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const date = new Date(user.created_at)
    const dateJoined = date.getDate()
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    console.log(year)
    console.log(month)
    console.log(dateJoined)

    function handleSubmit(evt) {
        evt.preventDefault()
        const err__span = document.querySelector(".err")
        const search__element = document.querySelector(".search__user")
        const searchValue = search__element.value
        const url = "https://api.github.com/users/"
        err__span.classList.remove("err__show")
        console.log(searchValue)
        axios
            .get(`${url}${searchValue}`)
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    setUser(response.data)
                    console.log(response.data)
                    console.log(response.status)
                    search__element.value = ""
                    gsap.from(".card__profile__img", { opacity: 0, duration: 2, ease: "bounce" })
                } else {
                    throw Error(response.statusText);
                }
                
            })
            .catch(err => {
                console.log(err.response.status)
                if (err.response.status === 404) {
                    err__span.classList.add("err__show")
                    gsap.from(".err", { opacity: 0, duration: 3, ease: "bounce" })
                }
            })

        console.log(user)

    }

    return (
        <main className="main">

            <form className="search__container" onSubmit={handleSubmit}>

                <label htmlFor="search__user" className="search__lbl">
                    <span className="sr__only">Search for github username </span>
                    <input type="search"
                        required
                        name="search__github__username"
                        placeholder="Search Github username..."
                        id="search__user"
                        className="search__user" />
                </label>
                <span className="err">No results</span>
                <button className="search--btn">Search</button>

            </form>

            <div className="card" role="region" aria-live="polite">
                <figure className="card__profile">
                    <img className="card__profile__img" src={user.avatar_url} alt="" />
                    <figcaption className="profile__card__details">
                        <h2 className="user__name">{user.name === null ? user.login : user.name}</h2>
                        <p className="user__handle">@{user.login}</p>
                        <p className="user__joined">Joined<time dateTime="2011"> {dateJoined} {month} {year}</time> </p>
                    </figcaption>
                </figure>
                <p className="extra__content">
                    {user.bio === null ? <span className="no__bio">"This profile has no bio"</span> : user.bio}
                </p>

                <div className="card__table">
                    <dl className="table__data">
                        <div className="repos__container">
                            <dt className="data__heading">Repos</dt>
                            <dd className="data__value">{user.public_repos}</dd>
                        </div>
                        <div className="followers__container">
                            <dt className="data__heading">Followers</dt>
                            <dd className="data__value">{user.followers}</dd>
                        </div>
                        <div className="following__container">
                            <dt className="data__heading">Following</dt>
                            <dd className="data__value">{user.following}</dd>
                        </div>
                    </dl>
                </div>

                <address className="address__list">

                    <div className="address__list__item location">

                        <img className="address__list__img location__img"
                            src={LocationImg}
                            alt="where user is located" />
                        <p className="area">{user.location}</p>

                    </div>

                    <div className="address__list__item blog">

                        <img className="address__list__img blog__img"
                            src={Blog}
                            alt="" />
                        <p className="user__blog">
                            {user.blog === null ?
                                <span className="no__bio" aria-hidden={true} >Not available</span> :
                                <a className="address--link"                                   
                                    href={user.blog}>{user.blog}
                                    <span className="sr__only">user blog post</span>
                                </a>
                            }
                        </p>

                    </div>

                    <div className="address__list__item twitter">

                        <img className="address__list__img twitter__img"
                            src={Twitter}
                            alt="" />

                        <p className="user__twitter">
                            {user.twitter_username === null ?
                                <span className="no__bio" aria-hidden={true}>Not available</span> :
                                <a className="address--link"
                                    arial-label="twitter handle"
                                    href={`https://twitter.com/${user.twitter_username}`}>
                                    {user.twitter_username}
                                    <span className="sr__only"> twitter handle</span>
                                </a>
                            }
                        </p>
                    </div>

                    <div className="address__list__item company__details">

                        <img className="address__list__img company__img"
                            src={CompanyImg}
                            alt="" />

                        <p className="company__name">
                            {user.company === null ?
                                <span className="no__bio" aria-hidden={true}>Not available</span> :
                                <a className="address--link"
                                    aria-label="company website"
                                    href={`https://${user.company}.com`}>
                                    {user.company}
                                    <span className="sr__only"> company website</span>
                                </a>
                            }
                        </p>

                    </div>

                </address>
            </div>


        </main>
    )
}

export default Main