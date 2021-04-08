### react-router-dom 有三类组件
- 路由包裹组件：BrowserRouter 和 HashRouter
> 使用 BrowserRouter 需要服务器的nginx 配置任何一个路径都是返回 index.html。使用时，通常这两个组件会作为根组件，包裹 App。
- 路由匹配组件：Switch 和 Route
> Switch 依次找内部匹配的 Route/Redirect，找到就渲染第一个匹配的，找不到渲染 null。所以较精确的 Route 应该放前面
- 路由导航组件：Link、NavLink、Redirect
> Link 用来创建一个链接 a 标签; NavLink 在创建标签的同时，如果当前路由和它匹配，那么它会显示设定的样式; Redirect 用来重定向

##### Route
- 路径相关
  - path: 需要匹配的路由前缀，可以是 string | string[]
  - exact: 代表路由只能对应 path，不能再有后缀
  - strict: 限制 /a 和 /a/ 不等价
  - sensitive: 是否对大小写敏感
  ```js
  /* 匹配 /a 开头的路径 */
  <Route path="/a"> 
  /* 匹配 /a 或者 /a/ */
  <Route path="/a" exact> 
  /* 只能匹配 /a */
  <Route path="/a" exact strict>
  ```
- 渲染相关
  - 直接在 Route 标签内写内容
  - component：匹配路径之后渲染，传入类组件的话，则不会每次渲染都删除实例再重新建立
  ```js
  <Route path="/user/:username" component={User} />
  ```
  - render：匹配路径之后渲染，通过一个方法返回类组件，则不会渲染都删除实例再重新建立
  ```js
  <Route path="/home" render={() => <User />} />
  ```
  - children：不管 Route 是否匹配都会执行 children，如果不匹配，传入的 match 对象的 null
  ```js
  <Route path="/home" children={({match}) => match ? <div>匹配</div> : <div>不匹配</div>}>
  ```
- 参数相关
  - match：获取当前路由的匹配信息
  ```js
  // 可以通过 props.match 获取，也可以通过 useRouteMatch 直接获取。（注意 useRouteMatch 传参时，会生成参数和当前URL匹配的 match 对象）
  {
    path: '/topics/:id',  /* Route 定义的匹配模式 */
    url: '/topics/2',     /* 与 URL 相匹配部分的路径 */
    params: {             /* 匹配到的动态参数对象，也可以通过 useParams 直接获取当前路由匹配的动态参数 */
      id: 2
    },
    isExact: true         /* 是否精确匹配 */
  }
  ```
  - location: 不可变的对象，用于获取当前 url 的信息
  ```js
  // 可以通过 props.location 获取，也可以通过 useLocation 直接获取
  {
    key: 'ac3df4', // not with HashHistory!
    pathname: '/somewhere',
    hash: '#howdy',
    search: '?some=search-string',
    state: {
      [userDefined]: true
    }
  }
  ```
  - history：编程式导航的对象
  ```js
  // 可以通过 props.history 获取，也可以通过 useHistory 直接获取
  {
    push,
    replace,
    go,
    ...
  }
  ```

#### Link、NavLink、Redirect
##### Link
- to：跳转路径
  - string
  - object
  ```js
  {
    pathname: "/courses", // 路由路径
    search: "?sort=name", // 查询字符串
    hash: "#the-hash", // hash值
    state: { fromDashboard: true } // 传递给 location 的信息
  }
  ```
  - () => object
- replace: 是否替换当前路由

##### NavLink
- to
- replace
- exact
- strict
- activeClassName
- activeStyle

##### Redirect
- from：跳转前的路径，匹配到的 params 会传递给 to
- exact
- strict
- sensitive
- to：跳转路径
  - string
  - object
- push: 默认 redirect 会覆盖路由，设为 true 可改为新增路由
