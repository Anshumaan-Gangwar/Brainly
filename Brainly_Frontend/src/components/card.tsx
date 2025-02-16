import {ShareIcon} from "../icons/ShareIcon.tsx"

interface CardProps{
    title:string,
    link:string,
    type:"twitter" | "youtube"
}


export function Card({title, type, link}:CardProps){
    return (
        <div className="p-4 bg-slate-50 rounded-md border-gray-200 w-72 border">
            <div className="flex justify-between items-center">
                <div className="flex items-center ">
                    <div className="mr-2">
                        <ShareIcon/>
                    </div>
                    {title}
                </div>
                <div className="flex ">
                    <div className="mr-2">
                        <a href={link} target="_blank">
                            <ShareIcon/>
                        </a>
                    </div>
                    <ShareIcon/>
                </div>
            </div>
            {/* main content */}
            {/* intedad of replace use regex and store the ids in databasee */}
            {type === "twitter" &&(
                <div>
                {/* <blockquote className="twitter-tweet" data-theme="light"><p lang="en" dir="ltr">Movie Flops today are often celebrated as &quot;CULT Classics&quot; 10 year later.<br/> :- <a href="https://twitter.com/hashtag/PoojaHegde?src=hash&amp;ref_src=twsrc%5Etfw">#PoojaHegde</a> <a href="https://t.co/3SRuXR1cs4">pic.twitter.com/3SRuXR1cs4</a></p>&mdash; Movie Threat (@MovieThreat) <a href="https://twitter.com/MovieThreat/status/1880876840610619539?ref_src=twsrc%5Etfw">January 19, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>  */}
                {type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                )}
                </div>
                
            )}
            {type === "youtube" &&(
                <iframe className="w-full my-4 rounded-lg" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            )}
            
        </div>
    )
}