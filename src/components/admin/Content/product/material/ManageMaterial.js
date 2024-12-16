import { useState, useEffect } from "react";
import ModelCreateMaterial from "./ModelCreateMaterial";
import TableMaterial from "./TableMaterial";
import { useDebounce } from "use-debounce";
import { useDispatch } from "react-redux";
import {
  fetchAllMaterial,
  fetchSearchMaterial,
} from "../../../../../redux/action/materialAction";
import AuthGuard from "../../../../auth/AuthGuard";
import RoleBasedGuard from "../../../../auth/RoleBasedGuard";

const ManageMaterial = () => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [debouncedSearchName] = useDebounce(searchName, 1000); // Sử dụng useDebounce với delay 1000ms
  useEffect(() => {
    if (debouncedSearchName) {
      dispatch(fetchSearchMaterial(debouncedSearchName));
    } else {
      dispatch(fetchAllMaterial());
    }
  }, [debouncedSearchName, dispatch]);
  return (
    <AuthGuard>
      <RoleBasedGuard accessibleRoles={["ADMIN"]}>
        <div className="manage-cart-container">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <h3>Quản lý chất liệu giày</h3>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="cart-content">
                    <div className="shoe-content-hender">
                      <label for="nameShoe" className="form-label">
                        Tên chất liệu
                      </label>
                      <div className="shoe-search-add row">
                        <div className="shoe-search mb-3 col-10">
                          <input
                            type="text"
                            className="form-control"
                            id="nameShoe"
                            placeholder="Tìm kiếm chất liệu theo tên...."
                            onChange={(event) =>
                              setSearchName(event.target.value)
                            }
                          />
                        </div>
                        <div className="shoe-add mb-3 col-2">
                          <ModelCreateMaterial />
                        </div>
                        <div className="shoe-content-body mt-3">
                          <TableMaterial />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RoleBasedGuard>
    </AuthGuard>
  );
};
export default ManageMaterial;
