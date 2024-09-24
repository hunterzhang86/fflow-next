---
title: 组件
description: 使用 MDX 在 Markdown 中使用 React 组件。
---

以下组件可以直接在 Markdown 中使用。

如果你想构建和添加自己的自定义组件,请参阅下面的[自定义组件](#自定义组件)部分。

## 内置组件

### 1. 提示框

```jsx
<Callout type="default | warning | danger | note | info | success">
  这是一个默认提示框。你可以在`callout`中嵌入**Markdown**。
</Callout>
```

<Callout>
  这是一个默认提示框。你可以在`callout`中嵌入**Markdown**。
</Callout>

<Callout type="warning">
  这是一个警告提示框。它使用了 `type="warning"` 属性。
</Callout>

<Callout type="danger">
  这是一个危险提示框。它使用了 `type="danger"` 属性。
</Callout>

<Callout type="note">
  这是一个注意提示框。它使用了 `type="note"` 属性。
</Callout>

<Callout type="info">
  这是一个信息提示框。它使用了 `type="info"` 属性。
</Callout>

<Callout type="success">
  这是一个成功提示框。它使用了 `type="success"` 属性。
</Callout>

### 2. 卡片

```mdx
<Card href="#">

#### 标题

你可以在卡片中使用**markdown**。

</Card>
```

<Card href="#">

#### 标题

你可以在卡片中使用**markdown**。

</Card>

你也可以使用 HTML 将卡片嵌入网格中。

```mdx
<div className="grid grid-cols-2 gap-4">
  <Card href="#">
    #### 卡片一
    你可以在卡片中使用**markdown**。
  </Card>

  <Card href="#">
    #### 卡片二
    你也可以使用`内联代码`和代码块。
  </Card>
</div>
```

<div className="grid grid-cols-2 gap-4">
  <Card href="#">
    #### 卡片一
    你可以在卡片中使用**markdown**。
  </Card>

  <Card href="#">
    #### 卡片二
    你也可以使用`内联代码`和代码块。
  </Card>
</div>

---

## 自定义组件

你可以使用 `useMDXComponent` 的 `components` 属性添加自己的自定义组件。

```ts title="components/mdx.tsx" {2,6}
import { Callout } from "@/components/callout"
import { CustomComponent } from "@/components/custom"

const components = {
  Callout,
  CustomComponent,
}

export function Mdx({ code }) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}
```

添加自定义组件后,你可以在 MDX 中如下使用它:

```js
<CustomComponent propName="value" />
```

---

## HTML 元素

你可以使用上面相同的技术覆盖 HTML 元素。

```ts {4}
const components = {
  Callout,
  CustomComponent,
  hr: ({ ...props }) => <hr className="my-4 border-slate-200 md:my-6" />,
}
```

这将用上面的 HTML 输出覆盖 `<hr />` 标签或 Markdown 中的 `---`。

---

## 样式

可以在 MDX 中使用 Tailwind CSS 类进行样式设置。

```jsx
<p className="text-red-600">这段文字将会是红色的。</p>
```

确保你已经在 `tailwind.config.js` 文件中配置了内容的路径:
