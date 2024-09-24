---
title: 仪表板布局选项
description: 为您的仪表板选择两种不同的布局选项。
---

探索可用于自定义仪表板的不同布局选项。您可以在两种仪表板布局之间进行选择。

## 居中的侧边栏和主要内容

在这种布局中,侧边栏和主要内容都居中在页面中间,类似于 **Stripe 仪表板**。

```tsx
<MaxWidthWrapper className="max-w-[1650px] px-0">
  <div className="relative flex min-h-screen w-full">
    <DashboardSidebar links={filteredLinks} />

    <div className="flex flex-1 flex-col">
      <header className="bg-background sticky top-0 z-50 flex h-14 items-center gap-3 px-4 lg:h-[60px] xl:px-10">
        <MobileSheetSidebar links={filteredLinks} />

        <div className="w-full flex-1">
          <SearchCommand links={filteredLinks} />
        </div>

        <ModeToggle />
        <UserAccountNav />
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 xl:px-10">
        {children}
      </main>
    </div>
  </div>
</MaxWidthWrapper>
```

## 固定侧边栏和居中主要内容

在这种布局中,侧边栏固定在窗口的左侧,而只有主要内容居中在页面上。这提供了一个更加**传统的外观**。这是默认布局。

```tsx
<div className="relative flex min-h-screen w-full">
  <DashboardSidebar links={filteredLinks} />

  <div className="flex flex-1 flex-col">
    <header className="bg-background sticky top-0 z-50 flex h-14 px-4 lg:h-[60px] xl:px-8">
      <MaxWidthWrapper className="flex max-w-7xl items-center gap-x-3 px-0">
        <MobileSheetSidebar links={filteredLinks} />

        <div className="w-full flex-1">
          <SearchCommand links={filteredLinks} />
        </div>

        <ModeToggle />
        <UserAccountNav />
      </MaxWidthWrapper>
    </header>

    <main className="flex-1 p-4 xl:px-8">
      <MaxWidthWrapper className="flex h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6">
        {children}
      </MaxWidthWrapper>
    </main>
  </div>
</div>
```

请根据您的设计偏好和用户体验目标选择最适合的布局。