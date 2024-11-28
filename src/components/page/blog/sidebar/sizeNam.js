import React from "react";
import "./sizeNam.scss";

const SizeNam = () => {
  return (
    <div className="menu-container">
      <h1 className="title">NAM BẢNG KÍCH CỠ</h1>
      <div className="content-container">
        <p className="subtitle">Bảng đo size giày dựa vào chiều dài và chiều rộng</p>
        <table className="size-table">
          <thead>
            <tr>
              <th>CHIỀU DÀI (cm)</th>
              <th>CHIỀU RỘNG (cm)</th>
              <th>CỠ GIÀY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>21</td>
              <td>7.5 - 8</td>
              <td>32</td>
            </tr>
            <tr>
              <td>21.1 - 21.5</td>
              <td>8</td>
              <td>33</td>
            </tr>
            <tr>
              <td>21.6 - 22</td>
              <td>8 - 8.5</td>
              <td>34</td>
            </tr>
            <tr>
              <td>22.1 - 22.5</td>
              <td>8.5</td>
              <td>35</td>
            </tr>
            <tr>
              <td>22.6 - 23</td>
              <td>8.5 - 9</td>
              <td>36</td>
            </tr>
            <tr>
              <td>23.1 - 23.5</td>
              <td>9</td>
              <td>37</td>
            </tr>
            <tr>
              <td>23.6 - 24</td>
              <td>9 - 9.5</td>
              <td>38</td>
            </tr>
            <tr>
              <td>24.1 - 24.5</td>
              <td>9.5</td>
              <td>39</td>
            </tr>
            <tr>
              <td>24.6 - 25</td>
              <td>9.5 - 10</td>
              <td>40</td>
            </tr>
            <tr>
              <td>25.1 - 25.5</td>
              <td>10</td>
              <td>41</td>
            </tr>
            <tr>
              <td>25.6 - 26</td>
              <td>10 - 10.5</td>
              <td>42</td>
            </tr>
            <tr>
              <td>26.1 - 26.5</td>
              <td>10.5</td>
              <td>43</td>
            </tr>
            <tr>
              <td>26.6 - 27</td>
              <td>10.5 - 11</td>
              <td>44</td>
            </tr>
          </tbody>
        </table>

        <p className="subtitle pt-5">Bảng đo size giày và chuyển đổi size giày nam sang US UK theo chiều dài bàn chân</p>
        <table className="size-table">
          <thead>
            <tr>
              <th>Size US</th>
              <th>Size UK</th>
              <th>Size VN</th>
              <th>Chiều dài bàn chân (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>7</td>
              <td>6</td>
              <td>40</td>
              <td>24.4</td>
            </tr>
            <tr>
              <td>7.5</td>
              <td>6.5</td>
              <td>40 - 41</td>
              <td>24.8</td>
            </tr>
            <tr>
              <td>8</td>
              <td>7</td>
              <td>41</td>
              <td>25.2</td>
            </tr>
            <tr>
              <td>8.5</td>
              <td>7.5</td>
              <td>41 - 42</td>
              <td>25.7</td>
            </tr>
            <tr>
              <td>9</td>
              <td>8</td>
              <td>42</td>
              <td>26</td>
            </tr>
            <tr>
              <td>9.5</td>
              <td>8.5</td>
              <td>42 - 43</td>
              <td>26.5</td>
            </tr>
            <tr>
              <td>10</td>
              <td>9</td>
              <td>43</td>
              <td>26.8</td>
            </tr>
            <tr>
              <td>10.5</td>
              <td>9.5</td>
              <td>43 - 44</td>
              <td>27.3</td>
            </tr>
            <tr>
              <td>11</td>
              <td>10</td>
              <td>44</td>
              <td>27.8</td>
            </tr>
            <tr>
              <td>11.5</td>
              <td>10.5</td>
              <td>44 - 45</td>
              <td>28.3</td>
            </tr>
            <tr>
              <td>12</td>
              <td>11</td>
              <td>45</td>
              <td>28.6</td>
            </tr>
            <tr>
              <td>13</td>
              <td>12</td>
              <td>46</td>
              <td>29.4</td>
            </tr>
          </tbody>
        </table>

        <h1 className="title">Bảng size giày Adidas</h1>
      <p className="description pb-5">
        Nếu muốn cải thiện phong cách thời trang năng động, trẻ trung với các đôi giày Adidas thì bạn cần phải có một mẫu giày phù hợp, vừa vặn với đôi chân của mình để vận động thoải mái nhất. Dưới đây là bảng size giày nam của Adidas:
      </p>
      <table className="size-table">
        <thead>
          <tr>
            <th>Size Việt Nam</th>
            <th>Size US</th>
            <th>Size UK</th>
            <th>Centimet</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>36</td>
            <td>5</td>
            <td>3.5</td>
            <td>22</td>
          </tr>
          <tr>
            <td>36 2/3</td>
            <td>5.5</td>
            <td>4</td>
            <td>22.5</td>
          </tr>
          <tr>
            <td>37 1/3</td>
            <td>6</td>
            <td>4.5</td>
            <td>23</td>
          </tr>
          <tr>
            <td>38</td>
            <td>6.5</td>
            <td>5</td>
            <td>23.5</td>
          </tr>
          <tr>
            <td>38 2/3</td>
            <td>7</td>
            <td>5.5</td>
            <td>24</td>
          </tr>
          <tr>
            <td>39 1/3</td>
            <td>7.5</td>
            <td>6</td>
            <td>24.5</td>
          </tr>
          <tr>
            <td>40</td>
            <td>8</td>
            <td>6.5</td>
            <td>25</td>
          </tr>
          <tr>
            <td>40 2/3</td>
            <td>8.5</td>
            <td>7</td>
            <td>25.5</td>
          </tr>
          <tr>
            <td>41 1/3</td>
            <td>9</td>
            <td>7.5</td>
            <td>26</td>
          </tr>
          <tr>
            <td>42</td>
            <td>9.5</td>
            <td>8</td>
            <td>26.5</td>
          </tr>
          <tr>
            <td>42 2/3</td>
            <td>10</td>
            <td>8.5</td>
            <td>27</td>
          </tr>
          <tr>
            <td>43 1/3</td>
            <td>10.5</td>
            <td>9</td>
            <td>27.5</td>
          </tr>
          <tr>
            <td>44</td>
            <td>11</td>
            <td>9.5</td>
            <td>28</td>
          </tr>
        </tbody>
      </table>

      <h1 className="title">Bảng size giày Nike</h1>
      <p className="description pb-5">
        Nike là một trong những thương hiệu thời trang nổi tiếng và được xem là "đối trọng" của Adidas trong các sản phẩm thời trang. Nhiều nam giới yêu thích các đôi giày Nike nhờ vào mẫu mã, kiểu dáng đa dạng và phù hợp với phong cách sống năng động. Vì vậy, bạn cũng đừng bỏ qua bảng size giày nam của Nike nhé:
      </p>
      <table className="size-table">
        <thead>
          <tr>
            <th>Size Việt Nam</th>
            <th>Size US</th>
            <th>Size UK</th>
            <th>Centimet</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>35.5</td>
            <td>5</td>
            <td>2.5</td>
            <td>22</td>
          </tr>
          <tr>
            <td>36</td>
            <td>5.5</td>
            <td>3</td>
            <td>22.5</td>
          </tr>
          <tr>
            <td>36.5</td>
            <td>6</td>
            <td>3.5</td>
            <td>23</td>
          </tr>
          <tr>
            <td>37.5</td>
            <td>6.5</td>
            <td>4</td>
            <td>23.5</td>
          </tr>
          <tr>
            <td>38</td>
            <td>7</td>
            <td>4.5</td>
            <td>24</td>
          </tr>
          <tr>
            <td>38.5</td>
            <td>7.5</td>
            <td>5</td>
            <td>24.5</td>
          </tr>
          <tr>
            <td>39</td>
            <td>8</td>
            <td>5.5</td>
            <td>25</td>
          </tr>
          <tr>
            <td>40</td>
            <td>8.5</td>
            <td>6</td>
            <td>25.5</td>
          </tr>
          <tr>
            <td>40.5</td>
            <td>9</td>
            <td>6.5</td>
            <td>26</td>
          </tr>
          <tr>
            <td>41</td>
            <td>9.5</td>
            <td>7</td>
            <td>26.5</td>
          </tr>
          <tr>
            <td>42</td>
            <td>10</td>
            <td>7.5</td>
            <td>27</td>
          </tr>
          <tr>
            <td>42.5</td>
            <td>10.5</td>
            <td>8</td>
            <td>27.5</td>
          </tr>
          <tr>
            <td>43</td>
            <td>11</td>
            <td>8.5</td>
            <td>28</td>
          </tr>
        </tbody>
      </table>

      <h1 className="title">Bảng size giày Converse</h1>
      <p className="description pb-5">
        Converse là thương hiệu giày thời trang nổi tiếng toàn thế giới với tuổi đời hơn 100 năm. Với bảng size giày Converse dưới đây, bạn có thể chọn những đôi giày thích hợp với đôi chân bản thân hoặc của người mà mình dự định tặng đấy:
      </p>
      <table className="size-table">
        <thead>
          <tr>
            <th>Size Việt Nam</th>
            <th>Size US</th>
            <th>Centimet</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>35</td>
            <td>3</td>
            <td>22</td>
          </tr>
          <tr>
            <td>36</td>
            <td>3.5</td>
            <td>22.5</td>
          </tr>
          <tr>
            <td>36.5</td>
            <td>4</td>
            <td>23</td>
          </tr>
          <tr>
            <td>37</td>
            <td>4.5</td>
            <td>23.5</td>
          </tr>
          <tr>
            <td>37.5</td>
            <td>5</td>
            <td>24</td>
          </tr>
          <tr>
            <td>38</td>
            <td>5.5</td>
            <td>24.5</td>
          </tr>
          <tr>
            <td>38.5 - 39</td>
            <td>6</td>
            <td>24.5</td>
          </tr>
          <tr>
            <td>39.5</td>
            <td>6.5</td>
            <td>25</td>
          </tr>
          <tr>
            <td>40</td>
            <td>7</td>
            <td>25.5</td>
          </tr>
          <tr>
            <td>40.5 - 41</td>
            <td>7.5</td>
            <td>26</td>
          </tr>
        </tbody>
      </table>

      <h1 className="title">Bảng size giày New Balance</h1>
      <p className="description pb-5">
        Các mẫu giày New Balance có một công thức quy đổi size giày riêng biệt so với các thương hiệu khác trên thị trường. Vì vậy, bạn hãy tham khảo bảng quy đổi của thương hiệu này để tránh mua nhầm size nhé:
      </p>
      <table className="size-table">
        <thead>
          <tr>
            <th colSpan="5">Mens</th>
            <th colSpan="5 float-end">Womens</th>
          </tr>
          <tr>
            <th>US</th>
            <th>UK</th>
            <th>EU</th>
            <th>CM</th>
            <th></th>
            <th>US</th>
            <th>UK</th>
            <th>EU</th>
            <th>CM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5</td>
            <td>4.5</td>
            <td>37 1/2</td>
            <td>23</td>
            <td></td>
            <td>5</td>
            <td>3</td>
            <td>35</td>
            <td>22</td>
          </tr>
          <tr>
            <td>5.5</td>
            <td>5</td>
            <td>38</td>
            <td>23.5</td>
            <td></td>
            <td>5.5</td>
            <td>3.5</td>
            <td>36</td>
            <td>22.5</td>
          </tr>
          <tr>
            <td>6</td>
            <td>5.5</td>
            <td>38.5</td>
            <td>24</td>
            <td></td>
            <td>6</td>
            <td>4</td>
            <td>36.5</td>
            <td>23</td>
          </tr>
          <tr>
            <td>6.5</td>
            <td>6</td>
            <td>39 1/2</td>
            <td>24.5</td>
            <td></td>
            <td>6.5</td>
            <td>4.5</td>
            <td>37</td>
            <td>23.5</td>
          </tr>
          <tr>
            <td>7</td>
            <td>6.5</td>
            <td>40</td>
            <td>25</td>
            <td></td>
            <td>7</td>
            <td>5</td>
            <td>37 1/2</td>
            <td>24</td>
          </tr>
          <tr>
            <td>7.5</td>
            <td>7</td>
            <td>40 1/2</td>
            <td>25.5</td>
            <td></td>
            <td>7.5</td>
            <td>5.5</td>
            <td>38</td>
            <td>24.5</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default SizeNam;
