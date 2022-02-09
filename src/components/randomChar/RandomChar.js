import {Component} from 'react';
import './randomChar.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";
import Spinner from '../spinner/spinner';

class RandomChar extends Component {


    state = {
        char:{},
        loading: true,
        error:false
    }

    marvelService = new MarvelService(); //создание нового экземпляра класса , создаем новое войство внутри класса RandomChar

    componentDidMount() {
        this.updateCharacter();
        console.log('mount');
    }



    onCharacterLoaded= (char) => {
        console.log('update');
        this.setState({
            char:char,
            loading:false
        })
    }


    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () =>{
        this.setState({
           loading:false,
            error:true
        })
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random()*(1011400-1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharacterLoaded)   //в промисах если просто указанна ссылка на  функцию то аргумент который
            // приходит автоматически подставляется в функцию пример : this.onCharacterLoaded(char)
            .catch(this.onError)
    }


    render() {
        console.log('render');
        const {char,loading,error} = this.state;
        const errorMessage = error ? <ErrorMessage/> :null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        

        return (
            <div className="randomchar">
               {errorMessage}
               {spinner}
               {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateCharacter}>
                        <div className="inner" >try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
 
    const {name,description,thumbnail,homepage,wiki} = char
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return(
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;