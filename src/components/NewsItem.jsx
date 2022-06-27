import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {

        let {title, description, imageUrl, newsUrl,author,date,source} = this.props
        return (
            <div className='my-4'>
                <div className="card">
                    <img className="card-img-top" src={!imageUrl?"https://images.unsplash.com/photo-1478940020726-e9e191651f1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5ld3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60":imageUrl} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"85%",zIndex:"1"}}>
                            {source}</span></h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" :author} updated {new Date(date).toGMTString()} ago</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}
