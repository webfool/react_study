#### 总结
- useState、useReducer 用于在函数组件中实现 class 组件中 state 和 setState 的状态管理的功能
- useEffect 用于在函数组件中实现 class 组件的生命周期功能（componentDidMount、componentDidUpdate、componentWillUnmount）
- useContext 用于消费上下文
- useRef、useImperativeHandle 用于生成 ref 和管理
- useMemo、useCallback 用于在函数组件频繁渲染时缓存值（性能优化）

hook 只能在函数最外层调用，不能在循环、if...else、子函数中调用