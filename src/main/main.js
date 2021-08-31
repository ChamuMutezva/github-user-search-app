import { useEffect, useState } from 'react'
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
        const searchValue = document.querySelector(".search__user").value
        const url = "https://api.github.com/users/"

        console.log(searchValue)
        axios
            .get(`${url}${searchValue}`)
            .then(response => {
                setUser(response.data)
            })
        // console.log("user")
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

                <button className="search--btn">Search</button>

            </form>

            <div className="card">
                <figure className="card__profile">
                    <img className="card__profile__img" src={user.avatar_url} alt="" />
                    <figcaption className="profile__card__details">
                        <h2 className="user__name">{user.name}</h2>
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
                        <img className="address__list__img location__img" src={LocationImg} alt="" />
                        <p className="area">{user.location}</p>
                    </div>

                    <div className="address__list__item blog">
                        <img className="address__list__img blog__img" src={Blog} alt="" />
                        <p className="user__blog">
                            {user.blog === null ?
                                <span className="no__bio">Not available</span> :
                                user.blog}
                        </p>
                    </div>

                    <div className="address__list__item twitter">
                        <img className="address__list__img twitter__img" src={Twitter} alt="" />
                        <p className="user__twitter">
                            {user.twitter_username === null ?
                                <span className="no__bio">Not available</span> :
                                user.twitter_username}
                        </p>
                    </div>

                    <div className="address__list__item company__details">
                        <img className="address__list__img company__img" src={CompanyImg} alt="" />
                        <p className="company__name">
                            {user.company === null ?
                                <span className="no__bio">Not available</span> :
                                user.company}
                        </p>
                    </div>

                </address>
            </div>


        </main>
    )
}

export default Main