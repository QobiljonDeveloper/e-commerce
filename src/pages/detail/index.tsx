// import { memo } from 'react';
// import { Link, Outlet } from 'react-router-dom';

// const Detail = () => {
//   return (
//     <div className="Detail">
//       <h2>Detail</h2>
//       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus dolorum impedit perspiciatis, placeat, consequatur tempore aliquid incidunt, voluptatum soluta amet omnis neque iure iusto asperiores ipsa obcaecati labore! Est voluptatibus nobis aliquam deleniti nihil nam quae necessitatibus! Reiciendis quibusdam laboriosam autem eius, veniam, optio ratione neque quas quae deleniti aliquam quaerat sed, esse modi doloremque unde. Nobis, necessitatibus. Obcaecati doloremque praesentium totam eius aut. Quaerat alias quae provident voluptatum minus aperiam neque, cumque quas fuga laboriosam exercitationem sapiente magnam itaque illum ex est optio nam dolores impedit adipisci soluta mollitia nisi excepturi labore? Eius natus eligendi vero iste. Minus sapiente laboriosam harum magni at, quia voluptatum asperiores incidunt alias nihil error saepe eius maxime dicta optio soluta provident, praesentium nulla nesciunt molestias quos. Labore, quasi ducimus quam nisi fuga molestias odit esse et dolorum, consectetur illo earum minus animi voluptatibus assumenda eos fugit quaerat aspernatur officia dolorem hic iusto, maiores id? Doloremque, laborum et! Obcaecati sed quaerat quidem quos explicabo rerum, in nobis culpa maiores aspernatur numquam quisquam fugit iure at? Ad repudiandae quo nesciunt ipsam explicabo eum sit illum soluta accusantium amet animi iste consequuntur nihil quas quaerat nisi nulla eius labore similique, exercitationem quae nemo voluptatibus magni eaque? Veritatis cumque, quas adipisci voluptatem eligendi blanditiis itaque voluptate minima alias possimus est doloremque repellendus! Impedit, recusandae tempore eaque quod fugiat reiciendis. Neque pariatur accusamus dolores eos perspiciatis adipisci suscipit, culpa commodi, sint tenetur necessitatibus? Modi, voluptatum! Quos nemo magni, possimus iste maiores odio! Molestiae illum ipsam vero corporis dolores debitis, voluptate hic beatae quidem blanditiis. Praesentium cum ullam harum recusandae eveniet iure architecto beatae quidem eum repudiandae quasi at, esse possimus, nihil quibusdam sequi amet corrupti perspiciatis eaque animi? Nemo tenetur quo doloribus illo alias cum, laudantium dolorem est quos voluptates voluptate placeat nihil laboriosam perspiciatis ratione magnam eius officiis. Cum, quod tempore aliquam accusantium debitis facilis sequi voluptatum nobis dolores mollitia delectus, ex neque est eveniet magni ea exercitationem et laboriosam quas. Rerum laborum, ut pariatur deserunt ipsam mollitia officia iste optio accusamus eum ad repudiandae harum, quam fuga, neque soluta? At hic corporis quae, quas aperiam obcaecati suscipit provident blanditiis amet? Facere eaque adipisci molestias, dolores tempore alias magni sequi tenetur, error delectus ipsum nam atque rem, temporibus nesciunt doloribus qui totam aperiam inventore quam sint obcaecati sunt pariatur odit. Enim nulla maxime expedita adipisci magnam recusandae eos perferendis ipsam illum natus modi totam, placeat deleniti quis rem et dignissimos. Saepe architecto expedita, cumque debitis natus ab magnam ducimus rem quod voluptate repellat reiciendis tempore quam animi obcaecati itaque illo, eum consequatur eius necessitatibus quia deleniti amet fugit nihil. Tempore repudiandae veritatis voluptatem, excepturi aspernatur consequuntur eum nihil beatae dolore at quas ullam quasi mollitia amet id repellendus quibusdam? Earum exercitationem quas odit maxime repudiandae adipisci quibusdam voluptatibus commodi perspiciatis quam, rerum ut cupiditate accusantium fugiat animi, nesciunt soluta blanditiis! Soluta autem quam aliquam incidunt dignissimos officia laudantium possimus esse veniam? Iusto numquam totam odio magnam exercitationem, veritatis aliquid obcaecati, quia quos, tempore vel quidem amet esse.</p>

//       <div className='tab'>
//         <Link to={""}>Additional info</Link>
//         <Link to={"questions"}>questions</Link>
//         <Link to={"reviews"}>reviews</Link>
//       </div>
//       <Outlet/>
//     </div>
//   );
// };

// export default memo(Detail);



import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import ProductImages from "../../components/productDetail/ProductImages";
import ProductInfo from "../../components/productDetail/ProductInfo";


const Detail: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="container mx-auto py-10">
      {/* Asosiy layout (chapda rasm, o‘ngda info) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductImages
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
        <ProductInfo currentImage={currentImage} />
      </div>

      {/* Tabs (Additional, Questions, Reviews) */}
      <div className="mt-12">
        <div className="flex gap-8 border-b">
          <NavLink
            end
            to=""
            className={({ isActive }) =>
              `pb-3 font-medium transition-colors ${
                isActive
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            Additional Information
          </NavLink>
          <NavLink
            to="questions"
            className={({ isActive }) =>
              `pb-3 font-medium transition-colors ${
                isActive
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            Questions
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              `pb-3 font-medium transition-colors ${
                isActive
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            Reviews
          </NavLink>
        </div>

        {/* Nested routes chiqadigan joy */}
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Detail;
