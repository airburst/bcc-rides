import './App.css'

function App() {
  // useEffect(() => {
  //   if (groceryListId) {
  //     FirestoreService.getGroceryList(groceryListId)
  //       .then(groceryList => {
  //         if (groceryList.exists) {
  //           setError(null);
  //           setGroceryList(groceryList.data());
  //         } else {
  //           setError('grocery-list-not-found');
  //           setGroceryListId();
  //         }
  //       })
  //       .catch(() => setError('grocery-list-get-fail'));
  //   }
  // }, [groceryListId, setGroceryListId]);

  // Streaming
  //   useEffect(() => {
  //     const unsubscribe = FirestoreService.streamGroceryListItems(groceryListId,
  //         (querySnapshot) => {
  //             const updatedGroceryItems =
  //             querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  //             setGroceryItems(updatedGroceryItems);
  //         },
  //         (error) => setError('grocery-list-item-get-fail')
  //     );
  //     return unsubscribe;
  // }, [groceryListId, setGroceryItems]);

  return (
    <div className="App">
      <h1>BCC Rides</h1>
      <div>
        More to come...
      </div>
    </div>
  )
}

export default App
