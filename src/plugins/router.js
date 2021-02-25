import HelloWorld from '../components/HelloWorld.vue';
import Test from '../components/Test.vue';
import ShuJuZhen from '../components/ShuJuZhen.vue';

const router = [
    { path: '/test', name: "test", component: Test },
    { path: '/hello', name: "hello", component: HelloWorld },
    { path: '/shujuzhen', name: "shujuzhen", component: ShuJuZhen },
]

export default router;