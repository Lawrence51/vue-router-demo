import HelloWorld from '../components/HelloWorld.vue';
import Test from '../components/Test.vue';

const router = [
    { path: '/', name: "test", component: Test },
    { path: '/hello', name: "hello", component: HelloWorld },
]

export default router;