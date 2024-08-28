import {View} from "@lightningtv/solid";
import {Button, Row} from "@lightningtv/solid-ui";

export function App() {
  const createItems = (length: number) => {
    return Array.from({length}).map((_, i) => (
        <Button width={200} height={100}>
          Button {(i + 1).toString()}
        </Button>
    ));
  };

  const buttons = (num = 8) => createItems(num);
  const args = {
    children: buttons,
    scroll: 'always',
    wrap: false,
    x: 100
  };
  return <View width={2000} height={720} color={0x071423ff}>
    <Row autofocus {...args}>
      {buttons}
    </Row>
  </View>
}

export default App;
