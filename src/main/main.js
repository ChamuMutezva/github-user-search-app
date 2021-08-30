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
        <main>

            <form className="search__container" onSubmit={handleSubmit}>

                <label htmlFor="search__user" className="search__lbl">
                    <span className="sr__only">Search for github username </span>
                    <input type="search"
                        name="search__github__username" placeholder="Search Github username..." id="search__user" className="search__user" />
                </label>

                <button className="search--btn">Search</button>

            </form>

            <div className="card">
                <figure className="card__profile">
                    <img className="card__profile__img" src={user.avatar_url} alt="" />
                    <figcaption className="profile__card__details">
                        <h2 className="user__name">{user.name}</h2>
                        <p className="user__handle">{user.login}</p>
                        <p className="user__joined">Joined<time dateTime="2011"> {dateJoined} {month} {year}</time> </p>
                    </figcaption>
                </figure>
                <p className="extra__content">
                    {user.bio === null ? <span className="no__bio">"This profile has no bio"</span> : user.bio}                   
                </p>

                <div className="card__table">
                    <dl className="table__data">
                        <div className="repos__container">
                            <dt>Repos</dt>
                            <dd>{user.public_repos}</dd>
                        </div>
                        <div className="followers__container">
                            <dt>Followers</dt>
                            <dd>{user.followers}</dd>
                        </div>
                        <div className="following__container">
                            <dt>Following</dt>
                            <dd>{user.following}</dd>
                        </div>
                    </dl>
                </div>

                <address>
                    <div className="location">
                        <img src={LocationImg} alt="" />
                        <span className="area">{user.location}</span>
                    </div>
                    <div className="blog">
                        <img className="blog__img" src={Blog} alt="" />
                        <span className="user__blog">{user.blog}</span>
                    </div>
                    <div className="twitter">
                        <img className="twitter__img" src={Twitter} alt="" />
                        <span className="user__twitter">{user.twitter_username}</span>
                    </div>
                    <div className="company__details">
                        <img className="company__img" src={CompanyImg} alt="" />
                        <span className="company__name">{user.company}</span>
                    </div>
                </address>
            </div>


        </main>
    )
}

export default Main