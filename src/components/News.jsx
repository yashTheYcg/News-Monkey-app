import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize:8,
    category:"general"
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  capitalizeFirstLetter = (string) => {
    return (string.charAt(0).toUpperCase() + string.slice(1));
  }  

  constructor(props){
    super(props);
    this.state = {
      articles:[],
      loading: false,
      page:1,
      totalResults:0
    }    
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewMonkey`;
  }

  updateNews = async ()=> {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
}

  async componentDidMount(){
    this.updateNews();
  };
  

  //  handlePrevClick = async ()=> {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //    this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading:false
  //   })
  // }

  // handleNextClick = async ()=> {
  //   console.log("Next");

  //   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading:true});
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading:false
  //     })
  //   }
  // }

  fetchMoreData = async () => {
  
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    })

  };



  render() {
    return (
      <>
        <h2 className='text-center' >NewMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2> 
       {this.state.loading && <Spinner/> }          
        

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
          <div className='container'>

          <div className='row'>
        {this.state.articles.map( (element)=> {
          return <div className='col-md-4' key={element.url}>
            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        
        {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="submit" onClick={this.handlePrevClick} className='btn btn-outline-dark'> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="submit" onClick={this.handleNextClick} className='btn btn-outline-dark'> Next &rarr;</button>
        </div> */}

      </>
    )
  }
}

