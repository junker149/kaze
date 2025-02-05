// interface InputParams {
//     title: string;
//     metadata: string;
//     content: string;
// }
// {title, metadata, content}: InputParams
export default function Blog() {
    return <div className="flex h-screen p-3">
        <div className=" w-7/10 text-left p-25 pr-4 border-1 border-gray-200 border-r-0">
            {/* <div>{title}</div>
            <div>{metadata}</div>
            <div>{content}</div> */}
            <div className="text-6xl font-extrabold mb-2 mt-15">Taxing Laughter: The Joke Tax Chronicles</div>
            <div className="text-gray-300">Posted on August 24, 2023</div>
            <div className="mt-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, impedit autem repudiandae suscipit fugiat aliquam eligendi nisi reprehenderit molestiae iure quas delectus. Saepe vitae earum repellendus cum nulla.Voluptatum, nulla.</div>
        </div>
        <div className="w-3/10 text-left p-25 pl-10 border-1 border-gray-200 border-l-0">
            <div className="mt-12 font-semibold text-lg text-gray-400">Author</div>
            <div className="flex bg-red-100">
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
}