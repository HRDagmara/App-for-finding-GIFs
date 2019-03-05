App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    render: function () {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch} />
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    },

    handleSearch: function (searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText, function (gif) {
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        }.bind(this));
    },

    getGif(searchingText, callback) {
        let url = GIPHY_API_URL + 'https://api.giphy.com/v1/gifs/random?api_key=ardqeHtYaMyTVw1nT2hFFrzNlfCMaPE2' + GIPHY_PUB_KEY + '&tag=&rating=G' + searchingText;
        let xhr = new XMLHttpRequest();
        return new Promise(
            xhr.onload = function (resolve, reject) {
                if (xhr.status === 200) {
                    resolve(this.response);
                    let data = JSON.parse(xhr.responseText).data
                    let gif = {
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    }
                    callback(gif);
                } else {
                    reject(new Error(this.xhr.status));
                }
                request.onerror = function () {
                    reject(newError(
                        'XMLHttpRequest Error: ${this.xhr.status}'));
                }
                xhr.open('GET', url);
                xhr.send();
            }
        )
    },

    getGif()
        .then(response => console.log('Gif:' + response))
        .catch(error => console.error('Something went wrong', error))
})
