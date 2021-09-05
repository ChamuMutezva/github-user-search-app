const Form = (props) => {
    return (
        <form className="search__container"
            onSubmit={props.handleSubmit}>

            <label htmlFor="search__user"
                className="search__lbl">

                <span className="sr__only">
                    Search for github username
                </span>

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
    )
}
export default Form