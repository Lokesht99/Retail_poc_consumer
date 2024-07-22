// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import useSWR from "swr";
// import { useLocalization } from "../../common/localization";
// import { getAuthors } from "../../repo/AuthorRepo";
// import { getCategories } from "../../repo/CategoryRepo";
// import { getManufacturers } from "../../repo/ManufacturerRepo";
// import { act } from "react";

// function ProductFilter({ category, author,manufacturer, onCategoryChoice, onAuthorChoice,onManufacturerChoice }) {
//   const [selectedCatgory, setSelectedCategory] = useState();
//   const [selectedAuthor, setSelectedAuthor] = useState();
//   const [selectedManufacturer, setSelectedManufacturer] = useState();
//   const [authorFilter, setAuthorFilter] = useState();
//   const [manufacturerFilter, setManufacturerFilter] = useState();

//   const { localize } = useLocalization();

//   const authorData = useSWR("/authors", getAuthors, {
//     revalidateOnFocus: false,
//   });

//   const { data, error } = useSWR("/categories", getCategories, {
//     revalidateOnFocus: false,
//   });

//   const manufacturerData = useSWR("/manufacturers", getManufacturers, {
//     revalidateOnFocus: false,
//   });
//   const router = useRouter();

//   useEffect(() => {
//     setSelectedCategory(category);
//   }, [category]);

//   useEffect(() => {
//     setSelectedAuthor(author);
//   }, [author]);

//   useEffect(() => {
//     setSelectedManufacturer(manufacturer);
//   }, [manufacturer]);

//   useEffect(() => {
//     if (data && onCategoryChoice) {
//       onCategoryChoice(data.find((c) => c.id === category));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [category, data]);

//   useEffect(() => {
//     if (authorData.data && onCategoryChoice) {
//       onAuthorChoice(authorData.data.find((a) => a.id === author));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [author, data]);

//   useEffect(() => {
//     if (manufacturerData.data && onManufacturerChoice) {
//       onManufacturerChoice(manufacturerData.data.find((m) => m.id === manufacturer));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [manufacturer, manufacturerData.data]);

//   function handleSelect(event) {
//     let checkedQuery = {};
//     if (event.target.checked) {
//       checkedQuery = event.target.id;
//     }

//     const query = { ...router.query };
//     if (checkedQuery && event.target.name === "category") {
//       query.category = checkedQuery;
//     } else if (checkedQuery && event.target.name === "author") {
//       query.author = checkedQuery;
//     } else if (checkedQuery && event.target.name === "manufacturer") {
//       query.manufacturer = checkedQuery;
//     }

//     router.replace({
//       pathname: router.pathname,
//       query: query,
//     });
//   }

//   if (error) {
//     return null;
//   }

//   if (!data && !error) {
//     return <div></div>;
//   }

//   return (
//     <div className="accordion border">
//       <div className="accordion-item border-bottom">
//         <h2 className="accordion-header">
//           <button
//             className="accordion-button fw-bold"
//             data-bs-toggle="collapse"
//             data-bs-target="#collapseOne"
//             aria-expanded="true"
//             style={{ backgroundColor: "transparent" }}
//           >
//             Explore
//           </button>
//         </h2>
//         <div id="collapseOne" className="accordion-collapse collapse show">
//           <div className="accordion-body">
//             <div className="vstack gap-2">
//               <Link href={"/books"} replace>
//                 <a className="fw-medium link-dark text-decoration-none">
//                   {localize("all_products")}
//                 </a>
//               </Link>
//               <Link href={"/books/promotions"}>
//                 <a className="fw-medium link-dark text-decoration-none">
//                   {localize("promotions")}
//                 </a>
//               </Link>
//               <Link href={"/books/populars"}>
//                 <a className="fw-medium link-dark text-decoration-none">
//                   {localize("popular_products")}
//                 </a>
//               </Link>
//               <Link href={"/books/new-arrivals"}>
//                 <a className="fw-medium link-dark text-decoration-none">
//                   {localize("new_arrivals")}
//                 </a>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="accordion-item border-bottom">
//         <h2 className="accordion-header">
//           <button
//             className="accordion-button fw-bold"
//             data-bs-toggle="collapse"
//             data-bs-target="#collapseTwo"
//             aria-expanded="true"
//             style={{ backgroundColor: "transparent" }}
//           >
//             Departments
//           </button>
//         </h2>
//         <div id="collapseTwo" className="accordion-collapse collapse show">
//           <div
//             className="accordion-body scrollbar-custom py-1"
//             style={{ overflowY: "auto" }}
//           >
//             <input
//               type="search"
//               placeholder="Filter department"
//               className="form-control mb-3"
//               value={authorFilter ?? ""}
//               onChange={(e) => setAuthorFilter(e.target.value)}
//             />
//             <div
//               className="vstack gap-2"
//               style={{ maxHeight: 250, minHeight: 100 }}
//             >
//               {authorData.data &&
//                 authorData.data
//                   .filter(
//                     (a) => !authorFilter || a.name.startsWith(authorFilter)
//                   )
//                   .sort((a, b) => a.name.localeCompare(b.name))
//                   .map((a) => {
//                     return (
//                       <div key={a.id} className="form-check">
//                         <input
//                           type="radio"
//                           id={a.id}
//                           name="author"
//                           className="form-check-input"
//                           checked={selectedAuthor === a.id}
//                           onChange={handleSelect}
//                         />
//                         <label className="form-check-label" htmlFor={a.id}>
//                           {a.name}
//                         </label>
//                       </div>
//                     );
//                   })}
//               <a href="#" className="invisible p-1"></a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="accordion-item border-bottom">
//         <h2 className="accordion-header">
//           <button
//             className="accordion-button fw-bold"
//             data-bs-toggle="collapse"
//             data-bs-target="#collapseThree"
//             aria-expanded="true"
//             style={{ backgroundColor: "transparent" }}
//           >
//             Manufacturers
//           </button>
//         </h2>
//         <div id="collapseThree" className="accordion-collapse collapse show">
//           <div
//             className="accordion-body scrollbar-custom py-1"
//             style={{ overflowY: "auto" }}
//           >
//             <input
//               type="search"
//               placeholder="Filter manufacturer"
//               className="form-control mb-3"
//               value={manufacturerFilter ?? ""}
//               onChange={(e) => setManufacturerFilter(e.target.value)}
//             />
//             <div className="vstack gap-2" style={{ maxHeight: 250 }}>
//               {manufacturerData.data &&
//                 manufacturerData.data
//                   .filter(
//                     (a) => !manufacturerFilter || a.name.startsWith(manufacturerFilter)
//                   )
//                   .sort((a, b) => a.name.localeCompare(b.name))
//                   .map((a) => {
//                     return (
//                       <div key={a.id} className="form-check">
//                         <input
//                           type="radio"
//                           id={a.id}
//                           name="manufacturer"
//                           className="form-check-input"
//                           checked={selectedManufacturer === a.id}
//                           onChange={handleSelect}
//                         />
//                         <label className="form-check-label" htmlFor={a.id}>
//                           {a.name}
//                         </label>
//                       </div>
//                     );
//                   })}
//               <a href="#" className="invisible p-1"></a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="accordion-item">
//         <h2 className="accordion-header">
//           <button
//             className="accordion-button fw-bold"
//             data-bs-toggle="collapse"
//             data-bs-target="#collapseThree"
//             aria-expanded="true"
//             style={{ backgroundColor: "transparent" }}
//           >
//             Categories
//           </button>
//         </h2>
//         <div id="collapseThree" className="accordion-collapse collapse show">
//           <div
//             className="accordion-body scrollbar-custom py-1"
//             style={{ overflowY: "auto" }}
//           >
//             <div className="vstack gap-2" style={{ maxHeight: 250 }}>
//               {data.map((category) => {
//                 return (
//                   <div key={category.id} className="form-check">
//                     <input
//                       type="radio"
//                       id={category.id}
//                       name="category"
//                       className="form-check-input"
//                       checked={selectedCatgory === category.id}
//                       onChange={handleSelect}
//                     />
//                     <label className="form-check-label" htmlFor={category.id}>
//                       {category.name}
//                     </label>
//                   </div>
//                 );
//               })}
//               <a href="#" className="invisible p-1"></a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductFilter;


// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import useSWR from "swr";
// import { useLocalization } from "../../common/localization";
// import { getAuthors } from "../../repo/AuthorRepo";
// import { getCategories } from "../../repo/CategoryRepo";
// import { getManufacturers } from "../../repo/ManufacturerRepo";

// function ProductFilter({ category, author, manufacturer, onCategoryChoice, onAuthorChoice, onManufacturerChoice }) {
//   const [selectedCategory, setSelectedCategory] = useState();
//   const [selectedAuthor, setSelectedAuthor] = useState();
//   const [selectedManufacturer, setSelectedManufacturer] = useState();
//   const [authorFilter, setAuthorFilter] = useState();
//   const [manufacturerFilter, setManufacturerFilter] = useState();

//   const { localize } = useLocalization();

//   const authorData = useSWR("/authors", getAuthors, {
//     revalidateOnFocus: false,
//   });

//   const { data, error } = useSWR("/categories", getCategories, {
//     revalidateOnFocus: false,
//   });

//   const { data: manufacturerData, error: manufacturerError } = useSWR("/manufacturers", getManufacturers, {
//     revalidateOnFocus: false,
//   });

//   const router = useRouter();

//   useEffect(() => {
//     setSelectedCategory(category);
//   }, [category]);

//   useEffect(() => {
//     setSelectedAuthor(author);
//   }, [author]);

//   useEffect(() => {
//     setSelectedManufacturer(manufacturer);
//   }, [manufacturer]);

//   useEffect(() => {
//     if (data && onCategoryChoice) {
//       onCategoryChoice(data.find((c) => c.id === category));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [category, data]);

//   useEffect(() => {
//     if (authorData.data && onAuthorChoice) {
//       onAuthorChoice(authorData.data.find((a) => a.id === author));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [author, authorData.data]);

//   useEffect(() => {
//     if (manufacturerData && onManufacturerChoice) {
//       onManufacturerChoice(manufacturerData.find((m) => m.id === manufacturer));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [manufacturer, manufacturerData]);

//   function handleSelect(event) {
//     const checkedQuery = event.target.checked ? event.target.id : null;

//     const query = { ...router.query };
//     if (checkedQuery && event.target.name === "category") {
//       query.category = checkedQuery;
//     } else if (checkedQuery && event.target.name === "author") {
//       query.author = checkedQuery;
//     } else if (checkedQuery && event.target.name === "manufacturer") {
//       query.manufacturer = checkedQuery;
//     }

//     router.replace({
//       pathname: router.pathname,
//       query: query,
//     });
//   }

//   if (error) {
//         return null;
//       }
    
//       if (!data && !error) {
//         return <div></div>;
//       }

//   return (
//     <div className="accordion border">
//       <div className="accordion-item border-bottom">
//         <h2 className="accordion-header">
//           <button
//             className="accordion-button fw-bold"
//             data-bs-toggle="collapse"
//             data-bs-target="#collapseOne"
//             aria-expanded="true"
//             style={{ backgroundColor: "transparent" }}
//           >
//             Explore
//           </button>
//         </h2>
//         <div id="collapseOne" className="accordion-collapse collapse show">
//           <div className="accordion-body">
//             <div className="vstack gap-2">
//               <Link href={"/books"} replace>
//                 <a className="fw-medium link-dark text-decoration-none">
//                   {localize("all_products")}
//                 </a>
//               </Link>
//               <Link href={"/books/promotions"}>
//                 <a className="fw-medium link-dark text-decoration-none">
//                   {localize("promotions")}
//                 </a>
//               </Link>
//               <Link href={"/books/populars"}>
//                 <a className="fw-medium link-dark text-decoration-none">
//                   {localize("popular_products")}
//                 </a>
//               </Link>
//               <Link href={"/books/new-arrivals"}>
//                 <a className="fw-medium link-dark text-decoration-none">
//                   {localize("new_arrivals")}
//                 </a>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="accordion-item border-bottom">
//         <h2 className="accordion-header">
//           <button
//             className="accordion-button fw-bold"
//             data-bs-toggle="collapse"
//             data-bs-target="#collapseTwo"
//             aria-expanded="true"
//             style={{ backgroundColor: "transparent" }}
//           >
//             Departments
//           </button>
//         </h2>
//         <div id="collapseTwo" className="accordion-collapse collapse show">
//           <div
//             className="accordion-body scrollbar-custom py-1"
//             style={{ overflowY: "auto" }}
//           >
//             <input
//               type="search"
//               placeholder="Filter department"
//               className="form-control mb-3"
//               value={authorFilter ?? ""}
//               onChange={(e) => setAuthorFilter(e.target.value)}
//             />
//             <div
//               className="vstack gap-2"
//               style={{ maxHeight: 250, minHeight: 100 }}
//             >
//               {authorData.data &&
//                 authorData.data
//                   .filter(
//                     (a) => !authorFilter || a.name.startsWith(authorFilter)
//                   )
//                   .sort((a, b) => a.name.localeCompare(b.name))
//                   .map((a) => {
//                     return (
//                       <div key={a.id} className="form-check">
//                         <input
//                           type="radio"
//                           id={a.id}
//                           name="author"
//                           className="form-check-input"
//                           checked={selectedAuthor === a.id}
//                           onChange={handleSelect}
//                         />
//                         <label className="form-check-label" htmlFor={a.id}>
//                           {a.name}
//                         </label>
//                       </div>
//                     );
//                   })}
//               <a href="#" className="invisible p-1"></a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="accordion-item border-bottom">
//         <h2 className="accordion-header">
//           <button
//             className="accordion-button fw-bold"
//             data-bs-toggle="collapse"
//             data-bs-target="#collapseThree"
//             aria-expanded="true"
//             style={{ backgroundColor: "transparent" }}
//           >
//             Manufacturers
//           </button>
//         </h2>
//         <div id="collapseThree" className="accordion-collapse collapse show">
//           <div
//             className="accordion-body scrollbar-custom py-1"
//             style={{ overflowY: "auto" }}
//           >
//             <div className="vstack gap-2" style={{ maxHeight: 250 }}>
//               {manufacturerData &&
//                 manufacturerData
//                   .sort((m1, m2) => m1.name.localeCompare(m2.name))
//                   .map((m) => {
//                     return (
//                       <div key={m.id} className="form-check">
//                         <input
//                           type="radio"
//                           id={m.id}
//                           name="manufacturer"
//                           className="form-check-input"
//                           checked={selectedManufacturer === m.id}
//                           onChange={handleSelect}
//                         />
//                         <label className="form-check-label" htmlFor={m.id}>
//                           {m.name}
//                         </label>
//                       </div>
//                     );
//                   })}
//               <a href="#" className="invisible p-1"></a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="accordion-item">
//         <h2 className="accordion-header">
//           <button
//             className="accordion-button fw-bold"
//             data-bs-toggle="collapse"
//             data-bs-target="#collapseFour"
//             aria-expanded="true"
//             style={{ backgroundColor: "transparent" }}
//           >
//             Categories
//           </button>
//         </h2>
//         <div id="collapseFour" className="accordion-collapse collapse show">
//           <div
//             className="accordion-body scrollbar-custom py-1"
//             style={{ overflowY: "auto" }}
//           >
//             <div className="vstack gap-2" style={{ maxHeight: 250 }}>
//               {data.map((category) => {
//                 return (
//                   <div key={category.id} className="form-check">
//                     <input
//                       type="radio"
//                       id={category.id}
//                       name="category"
//                       className="form-check-input"
//                       checked={selectedCategory === category.id}
//                       onChange={handleSelect}
//                     />
//                     <label className="form-check-label" htmlFor={category.id}>
//                       {category.name}
//                     </label>
//                   </div>
//                 );
//               })}
//               <a href="#" className="invisible p-1"></a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductFilter;


import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useLocalization } from "../../common/localization";
import { getAuthors } from "../../repo/AuthorRepo";
import { getCategories } from "../../repo/CategoryRepo";
import { getManufacturers } from "../../repo/ManufacturerRepo";

function ProductFilter({ category, author, manufacturer, onCategoryChoice, onAuthorChoice, onManufacturerChoice }) {
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState();
  const [selectedManufacturer, setSelectedManufacturer] = useState();
  const [authorFilter, setAuthorFilter] = useState();

  const { localize } = useLocalization();

  const { data: authorsData, error: authorsError } = useSWR("/authors", getAuthors, {
    revalidateOnFocus: false,
  });

  const { data: categoriesData, error: categoriesError } = useSWR("/categories", getCategories, {
    revalidateOnFocus: false,
  });

  const { data: manufacturersData, error: manufacturersError } = useSWR("/manufacturers", getManufacturers, {
    revalidateOnFocus: false,
  });

  const router = useRouter();

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  useEffect(() => {
    setSelectedAuthor(author);
  }, [author]);

  useEffect(() => {
    setSelectedManufacturer(manufacturer);
  }, [manufacturer]);

  useEffect(() => {
    if (categoriesData && onCategoryChoice) {
      onCategoryChoice(categoriesData.find((c) => c.id === category));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, categoriesData]);

  useEffect(() => {
    if (authorsData && onAuthorChoice) {
      onAuthorChoice(authorsData.find((a) => a.id === author));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [author, authorsData]);

  useEffect(() => {
    if (manufacturersData && onManufacturerChoice) {
      onManufacturerChoice(manufacturersData.find((m) => m.id === manufacturer));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manufacturer, manufacturersData]);

  function handleSelect(event) {
    const checkedQuery = event.target.checked ? event.target.id : null;

    const query = { ...router.query };
    if (checkedQuery && event.target.name === "category") {
      query.category = checkedQuery;
    } else if (checkedQuery && event.target.name === "author") {
      query.author = checkedQuery;
    } else if (checkedQuery && event.target.name === "manufacturer") {
      query.manufacturer = checkedQuery;
    }

    router.replace({
      pathname: router.pathname,
      query: query,
    });
  }

  if (authorsError || categoriesError || manufacturersError) {
    return <div>Error loading data</div>;
  }

  if (!authorsData || !categoriesData || !manufacturersData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="accordion border">
      <div className="accordion-item border-bottom">
        <h2 className="accordion-header">
          <button
            className="accordion-button fw-bold"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            style={{ backgroundColor: "transparent" }}
          >
            Explore
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show">
          <div className="accordion-body">
            <div className="vstack gap-2">
              <Link href={"/books"} replace>
                <a className="fw-medium link-dark text-decoration-none">
                  {localize("all_products")}
                </a>
              </Link>
              <Link href={"/books/promotions"}>
                <a className="fw-medium link-dark text-decoration-none">
                  {localize("promotions")}
                </a>
              </Link>
              <Link href={"/books/populars"}>
                <a className="fw-medium link-dark text-decoration-none">
                  {localize("popular_products")}
                </a>
              </Link>
              <Link href={"/books/new-arrivals"}>
                <a className="fw-medium link-dark text-decoration-none">
                  {localize("new_arrivals")}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item border-bottom">
        <h2 className="accordion-header">
          <button
            className="accordion-button fw-bold"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="true"
            style={{ backgroundColor: "transparent" }}
          >
            Authors
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse show">
          <div
            className="accordion-body scrollbar-custom py-1"
            style={{ overflowY: "auto" }}
          >
            <input
              type="search"
              placeholder="Filter author"
              className="form-control mb-3"
              value={authorFilter ?? ""}
              onChange={(e) => setAuthorFilter(e.target.value)}
            />
            <div
              className="vstack gap-2"
              style={{ maxHeight: 250, minHeight: 100 }}
            >
              {authorsData &&
                authorsData
                  .filter(
                    (a) => !authorFilter || a.name.startsWith(authorFilter)
                  )
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((a) => {
                    return (
                      <div key={a.id} className="form-check">
                        <input
                          type="radio"
                          id={a.id}
                          name="author"
                          className="form-check-input"
                          checked={selectedAuthor === a.id}
                          onChange={handleSelect}
                        />
                        <label className="form-check-label" htmlFor={a.id}>
                          {a.name}
                        </label>
                      </div>
                    );
                  })}
              <a href="#" className="invisible p-1"></a>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item border-bottom">
        <h2 className="accordion-header">
          <button
            className="accordion-button fw-bold"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="true"
            style={{ backgroundColor: "transparent" }}
          >
            Manufacturers
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse show">
          <div
            className="accordion-body scrollbar-custom py-1"
            style={{ overflowY: "auto" }}
          >
            <div className="vstack gap-2" style={{ maxHeight: 250 }}>
              {manufacturersData &&
                manufacturersData
                  .sort((m1, m2) => m1.name.localeCompare(m2.name))
                  .map((m) => {
                    return (
                      <div key={m.id} className="form-check">
                        <input
                          type="radio"
                          id={m.id}
                          name="manufacturer"
                          className="form-check-input"
                          checked={selectedManufacturer === m.id}
                          onChange={handleSelect}
                        />
                        <label className="form-check-label" htmlFor={m.id}>
                          {m.name}
                        </label>
                      </div>
                    );
                  })}
              <a href="#" className="invisible p-1"></a>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button fw-bold"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="true"
            style={{ backgroundColor: "transparent" }}
          >
            Categories
          </button>
        </h2>
        <div id="collapseFour" className="accordion-collapse collapse show">
          <div
            className="accordion-body scrollbar-custom py-1"
            style={{ overflowY: "auto" }}
          >
            <div className="vstack gap-2" style={{ maxHeight: 250 }}>
              {categoriesData &&
                categoriesData
                  .sort((c1, c2) => c1.name.localeCompare(c2.name))
                  .map((c) => {
                    return (
                      <div key={c.id} className="form-check">
                        <input
                          type="radio"
                          id={c.id}
                          name="category"
                          className="form-check-input"
                          checked={selectedCategory === c.id}
                          onChange={handleSelect}
                        />
                        <label className="form-check-label" htmlFor={c.id}>
                          {c.name}
                        </label>
                      </div>
                    );
                  })}
              <a href="#" className="invisible p-1"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
