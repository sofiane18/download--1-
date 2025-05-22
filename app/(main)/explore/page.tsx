import { Suspense } from "react";
import ExploreClient from "../../../components/explore/ExploreClient";

export default function ExplorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreClient />
    </Suspense>
  );
}
