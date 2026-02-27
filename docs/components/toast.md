# Toast 轻提示

轻量的全局反馈提示，支持 `success`、`error`、`info` 三种类型，自动消失。

## 基础用法

调用 `showToast` 函数触发提示。

<ClientOnly>
  <div style="display:flex;gap:12px">
    <button class="toast-doc-btn toast-doc-btn--success" id="doc-btn-success">成功</button>
    <button class="toast-doc-btn toast-doc-btn--error"   id="doc-btn-error">错误</button>
    <button class="toast-doc-btn toast-doc-btn--info"    id="doc-btn-info">提示</button>
  </div>
</ClientOnly>

```ts
import { showToast } from "@/components/toast/toast";

showToast("操作成功", "success");
showToast("请求失败", "error");
showToast("提示信息", "info");
```

## 自定义时长

第三个参数传入毫秒数，默认 `2000ms`。

<ClientOnly>
  <div style="display:flex;gap:12px;flex-wrap:wrap">
    <button class="toast-doc-btn toast-doc-btn--info" id="doc-btn-short">短暂（1s）</button>
    <button class="toast-doc-btn toast-doc-btn--info" id="doc-btn-long">持久（5s）</button>
  </div>
</ClientOnly>

```ts
showToast("短暂提示", "info", 1000);
showToast("持久提示", "info", 5000);
```

## API

### showToast 方法

| 参数       | 说明         | 类型                             | 默认值   |
| ---------- | ------------ | -------------------------------- | -------- |
| `message`  | 提示内容     | `string`                         | —        |
| `type`     | 提示类型     | `'success' \| 'error' \| 'info'` | `'info'` |
| `duration` | 显示时长(ms) | `number`                         | `2000`   |

### CSS 变量

| 变量                 | 说明     | 默认值    |
| -------------------- | -------- | --------- |
| `--toast-text-color` | 文字颜色 | `#f5f7f9` |

<style>
.toast-doc-btn {
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.toast-doc-btn:hover { opacity: 0.85; }
.toast-doc-btn--success { background: #52c41a; color: #fff; }
.toast-doc-btn--error   { background: #ff4d4f; color: #fff; }
.toast-doc-btn--info    { background: #1677ff; color: #fff; }
</style>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  import('@/components/toast/toast.tsx').then(({ showToast }) => {
    document.getElementById('doc-btn-success')?.addEventListener('click', () => showToast('操作成功', 'success'));
    document.getElementById('doc-btn-error')?.addEventListener('click',   () => showToast('请求失败', 'error'));
    document.getElementById('doc-btn-info')?.addEventListener('click',    () => showToast('提示信息', 'info'));
    document.getElementById('doc-btn-short')?.addEventListener('click',   () => showToast('短暂提示', 'info', 1000));
    document.getElementById('doc-btn-long')?.addEventListener('click',    () => showToast('持久提示', 'info', 5000));
  });
});
</script>
