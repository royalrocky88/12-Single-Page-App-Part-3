import {Component} from 'react'

import './index.css'

// Replace this "Dummy Data" in "blogData" to "Fetch With Url"
// const blogData = {
//   title: 'Blog Name',
//   imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-3-img.png',
//   avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
//   author: 'Author Name',
//   content:
//     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
// }
//----------------------------------------------------------------

class BlogItemDetails extends Component {
  // use "state" to make "blank object data in bllogData"
  state = {blogData: {}}

  // get Blog Specified data by making API call
  // BlogItemDetails Component
  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    //  from "Route" has actually path of "id" with {history, location, match} use match
    // console.log(this.props)

    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    // ---------------------------------------------------------------

    // use "fetch(URL)" given in "resources.md" and here call api to replace dummy data to url given data
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    console.log(data)
    //------------------------------------------------------------

    // converting "snake_case" to "camel_case"
    const updatedData = {
      title: data.title,
      imageUrl: data.image_url, // "image_url" to "imageUrl"
      content: data.content,
      avatarUrl: data.avatar_url, // "avatar_url" to "avatarUrl"
      author: data.author,
    }
    // ------------------------------------------------------------

    // "blogData" have dummy data to replace with "updatedData"
    this.setState({blogData: updatedData})
  }

  //--------------------------------------------------------------------
  renderBlogItemDetails = () => {
    //   render the "blogData" here
    const {blogData} = this.state
    // ----------------------------------------------

    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
