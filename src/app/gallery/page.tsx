import cloudinary from "cloudinary";
import UploadButton from "./components/UploadButton";
import { SearchResult } from "../../../type";
import CloudinaryImgsUi from "./components/CloudinaryImgsUi";

export default async function GalleryPage() {
  // fetch all gallerys from a cloudy server
  const results = (await cloudinary.v2.search
    .expression("resource_type:image ")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    .execute()) as { resources: SearchResult[] };
  // console.log(results.resources);

  return (
    <>
      <section>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">gallery</h1>
            <UploadButton />
          </div>
          <div className="grid grid-cols-4 gap-4 ">
            {results.resources.map((el, i) => {
              return (
                <CloudinaryImgsUi
                  path={"gallery"}
                  imgData={el}
                  key={el.public_id}
                  src={el.public_id}
                  alt={el.public_id}
                  width="400"
                  height="300"
                  sizes="100vw"
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
